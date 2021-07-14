/* eslint-disable prettier/prettier */
import { NativeEventEmitter, 
         NativeModules }    from 'react-native';
import BleManager           from 'react-native-ble-manager';
import { stringToBytes }    from 'convert-string';

import globalVariables      from '../../global_variables.json';
import { askForPermition, 
         bleBinToString }   from './helper';
import Alert                from '../Alert';
import EventSystem          from './EventSystem';
import BluetoothState   from 'react-native-bluetooth-state-manager'
import BluetoothAlert   from './BluetoothDisabledDialog';

import config from './../Config';

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

class BluetoothManager {
    fatalError = false;
    connected = false;
    handFound = false;
    bluetoothOff = true;
    servicesRetrieved = false;
    userDoesntWantBl = false;

    evSys = new EventSystem();
    
    constructor ( ) {
        askForPermition()
        .then( permission => {
            if ( !permission ) { this.fatalError = true; console.error( "Permission Denied" ); return; }
            BleManager.start()
            .then( ( ) => {
                this.initListenners();
                //this.startConnectionRoutine();
                this.treatBluetoothDisabled( true );
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
        else if ( error.includes && error.includes( "Characteristic" ) && error.includes( "not found" ) ) {
            console.info( "Characteristic not found" );
            this.reconnect();
        }
        else if ( error == "Read failed" ) {
            console.info( error );
            this.reconnect();
        }
        else console.info( error );
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
                BleManager.connect( config.DEVICE_UUID )
                .then( ( ) => {
                    this.connected = true;
                    this.evSys.triggerEvent( 'connect' )
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
        BleManager.disconnect( config.DEVICE_UUID )
        .catch( this.treatError )
        this.connected = false;
        this.evSys.triggerEvent( 'disconnect' );
    }

    reconnect ( ) {
        this.disconnect();
        this.startConnectionRoutine()
    }
    
    retrieveServices ( ) {
        BleManager.retrieveServices( config.DEVICE_UUID )
        .then( ( ) => { 
            this.servicesRetrieved = true; 
            console.log( "Services Retrieved" ); 
        } )
        .catch( ( error ) => { 
            this.servicesRetrieved = false; 
            this.treatError( error );
        } )
    }
    
    treatBluetoothDisabled ( isGetState = false ) {
        if ( isGetState ) {
            if ( this.userDoesntWantBl ) return;
            else this.userDoesntWantBl = true;
        }
        BluetoothState.getState()
        .then( state => { if ( state != "PoweredOn" ) { 
            BluetoothAlert(); 
            this.bluetoothOff = true; 
            this.evSys.triggerEvent("bluetoothOnOff", false) 
        } else { 
            this.bluetoothOff = false;
            this.evSys.triggerEvent("bluetoothOnOff", true)
        } } )
        .catch( error => { console.warn( "Failed to read Bluetooth state." ) } );
    }
    treatConnectionBeforeCommand ( isGetState = false ) {
        this.treatBluetoothDisabled( isGetState );
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
            if ( device.id == config.DEVICE_UUID ) { 
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
        this.initEventSystemTriggers();
    }
    destroyListenners ( ) {
        Object.keys( this.eventCallbacks ).forEach( event => {
            bleManagerEmitter.removeAllListeners( "BleManager"+event );
        } )
    }
    initEventSystemTriggers () {
        bleManagerEmitter.addListener( "BleManagerDisconnectedPeripheral", ( device ) =>{
            if ( device.id == config.DEVICE_UUID ) { 
                this.connected = false; 
                this.servicesRetrieved = false;
                this.evSys.triggerEvent( 'disconnect' );
            }
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
            if ( device.id == config.DEVICE_UUID ) this.handFound = true;
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
        this.treatConnectionBeforeCommand( (charId == config.FULLSTATE_CHAR_UUID) );
        return new Promise( ( resolve, reject ) => {
            BleManager.read( config.DEVICE_UUID, serviceId, charId )
            .then( data => {
                console.info( `Read: ${bleBinToString( data )}` );
                resolve( bleBinToString( data ) )
            } )
            .catch( ( error ) => { this.treatError( error ); } )
        } )
    }

    getByteArrayMaxSize ( ) {
        return config.MODE_COUNT * ( globalVariables.MAX_NAME_SIZE + ( 12 * config.FINGER_COUNT) + 2 );
    }
    write ( serviceId, charId, data ) {
        this.treatConnectionBeforeCommand( );
        return new Promise( ( resolve, reject ) => {
            BleManager.write( config.DEVICE_UUID, serviceId, charId, stringToBytes(data), this.getByteArrayMaxSize() )
            .then( console.log )
            .catch( ( error ) => { this.treatError( error ); reject(error); } )
        } )
    }
}

export default BluetoothManager;