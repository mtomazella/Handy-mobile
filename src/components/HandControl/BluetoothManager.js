/* eslint-disable prettier/prettier */
import globalVariables      from '../../global_variables.json';
import BleManager           from 'react-native-ble-manager';
import { stringToBytes }     from 'convert-string';
import { askForPermition, 
         bleBinToString }   from './helper';

import alert from '../Alert';

class BluetoothManager {
    isConnectedAssumption = false;
    intervalDelay = 5000;

    constructor ( ) {
        BleManager.start({ showAlert: false });
        askForPermition();
        this.connect();
        this.retrieveServices();
    }

    treatError ( error ) {
        if ( error == "Device is not connected" ) {
            console.log( "An error occured while connecting to device: " + error );
            this.isConnectedAssumption = false;
            this.intervalDelay = 5000;
            alert( 'Falha ao se conectar com a prótese. Tenha certeza que ela está ligada.' );
        }
        else console.log( error );
        
        this.reconnect();
    }

    isConnected ( ) {
        return BleManager.isPeripheralConnected( globalVariables.DEVICE_UUID )
        .catch( error => { console.log( "Could not resolve if device is connected: " + error ) } );
    }
    
    connect ( ) {
        BleManager.connect( globalVariables.DEVICE_UUID )
        .then( ( ) => { this.isConnectedAssumption = true; this.intervalDelay = 2000; } )
        .catch( ( error ) => { this.treatError( error ); } );
    }

    reconnect ( ) {
        this.connect();
        this.retrieveServices()
    }
    
    retrieveServices ( ) {
        return BleManager.retrieveServices( globalVariables.DEVICE_UUID )
        .catch( error => { this.treatError( error ); } )
    }

    read ( serviceId, charId ) {
        return new Promise ( ( resolve, reject ) => {
            BleManager.read( globalVariables.DEVICE_UUID, serviceId, charId )
            .then ( ( result ) => {
                resolve( bleBinToString( result ) );
            } )
            .catch( error => { reject(error) } );
        } )
        .catch( error => { this.treatError( error ) } );
    }

    write ( serviceId, charId, data ) {
        BleManager.writeWithoutResponse( globalVariables.DEVICE_UUID, serviceId, charId, stringToBytes( data ) )
        .catch( error => { this.treatError( error ) } );
    }
}

export default BluetoothManager;