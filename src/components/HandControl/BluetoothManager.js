/* eslint-disable prettier/prettier */
import { NativeEventEmitter, 
         NativeModules }    from 'react-native';
import BleManager           from 'react-native-ble-manager';
import { stringToBytes }    from 'convert-string';

import globalVariables      from '../../global_variables.json';
import { askForPermition, 
         bleBinToString }   from './helper';
import Alert                from '../Alert';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

class BluetoothManager {
    fatalError = false;
    connected = false;
    handFound = false;
    servicesRetrieved = false;
    
    constructor ( ) {
        askForPermition()
        .then( permission => {
            if ( !permission ) { this.fatalError = true; console.error( "Permission Denied" ); return; }
            BleManager.start()
            .then( ( ) => {
                this.initListenners();
                this.startConnectionRoutine();
            } )
            .catch( ( error ) => {
                this.fatalError = true;
                console.error( error );
            } )
        } )
    }
    
    treatError ( error ) {
        if ( error == "Device is not connected" ) {
            console.info( error );
            this.reconnect();
        }
        else if ( error.includes( "Characteristic" ) && error.includes( "not found" ) ) {
            console.info( "Characteristic not found" );
            this.reconnect();
        }
        else if ( error == "Read failed" ) {
            console.info( error );
            this.reconnect();
        }
        //else console.info( error );
    }
     
        /* Connection Routine */
    connectInterval;
    startConnectionRoutine ( ) {
        this.connectInterval = setInterval( ( ) => {
            if ( !this.connected ) this.connect( );
            else this.stopConnectionRoutine();
        }, 6000 )
    }

    stopConnectionRoutine ( ) {
        clearInterval( this.connectInterval );
        this.connectInterval = null;
    }
    
    connect ( ) {
        this.searchForHand( );
        const interval = setInterval( ( ) => {
            if ( this.handFound ) {
                BleManager.connect( globalVariables.DEVICE_UUID )
                .then( ( ) => {
                    this.connected = true;
                    console.log( "Connected" )
                    new Alert( "Conectado" )
                    this.retrieveServices();
                } )
                .catch( error => { this.treatError( error ) } )
                clearInterval( interval );
            }
        }, 100 ); 
    }

    disconnect ( ) {
        BleManager.disconnect( globalVariables.DEVICE_UUID )
        .catch( this.treatError )
    }

    reconnect ( ) {
        this.disconnect();
        this.startConnectionRoutine()
    }
    
    retrieveServices ( ) {
        BleManager.retrieveServices( globalVariables.DEVICE_UUID )
        .then( ( ) => { 
            this.servicesRetrieved = true; 
            console.log( "Services Retrieved" ); 
        } )
        .catch( ( error ) => { 
            this.servicesRetrieved = false; 
            this.treatError( error );
        } )
    }
    
    treatConnectionBeforeCommand ( ) {
        if ( !this.connected ) {
            // new Alert( "Falha na conexão." );
            if ( this.connectInterval === null ) this.startConnectionRoutine();
        }
    }

        /* Event Handling */
    eventCallbacks = {
        DiscoverPeripheral: ( device ) => {
            // console.log( "Discovered Peripheral: " + device.id );
        },
        StopScan: ( ) => { console.info( "Scan Stop" ); },
        DisconnectedPeripheral: ( device ) => { 
            console.log( "Device disconnected: " + device );
            if ( device.id == globalVariables.DEVICE_UUID ) { 
                this.connected = false; 
                this.servicesRetrieved = false;
            }
        },
        DidUpdateValueForCharacteristic: ()=>{}
    }
    setCallbackForEvent ( event, callback ) { this.eventCallbacks[event] = callback; }
    initListenners ( ) {
        this.destroyListenners();
        Object.keys( this.eventCallbacks ).forEach( event => {
            bleManagerEmitter.addListener( "BleManager"+event, this.eventCallbacks[event], this );
        } )
    }
    destroyListenners ( ) {
        Object.keys( this.eventCallbacks ).forEach( event => {
            bleManagerEmitter.removeAllListeners( "BleManager"+event );
        } )
    }
    
        /* Scanning */
    scan ( seconds ) {
        BleManager.scan( [], seconds, false )
        .then( ( ) => { console.info("Scanning"); } )
        .catch( ( ) => { console.warn( "Scan failed" ) } )
    }

    searchForHand ( ) {
        this.handFound = false;
        const handler = ( device ) => {
            if ( device.id == globalVariables.DEVICE_UUID ) this.handFound = true;
        }
        bleManagerEmitter.addListener( "BleManagerDiscoverPeripheral", handler );
        this.scan( 3 );
        setTimeout( ( ) => {
            bleManagerEmitter.removeListener( "BleManagerDiscoverPeripheral", handler );
            // console.log( `Hand${ (this.handFound)?"":" not" } found` )
        }, 3000 );
    }
    

        /* I/O */
    read ( serviceId, charId ) {
        this.treatConnectionBeforeCommand();
        return new Promise( ( resolve, reject ) => {
            BleManager.read( globalVariables.DEVICE_UUID, serviceId, charId )
            .then( data => {
                console.info( `Read: ${bleBinToString( data )}` );
                resolve( bleBinToString( data ) )
            } )
            .catch( ( error ) => { this.treatError( error ); } )
        } )
    }

    write ( serviceId, charId, data ) {

    }
}

export default BluetoothManager;