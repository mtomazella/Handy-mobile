import globalVariables      from '../../global_variables.json';
import BleManager           from 'react-native-ble-manager';
import { stringToBytes }     from 'convert-string';
import { askForPermition, 
         bleBinToString }   from './helper';

class BluetoothManager {
    constructor ( ) {
        BleManager.start({ showAlert: false });
        askForPermition();
        this.connect();
        this.retrieveServices();
    }

    isConnected ( ) {
        return BleManager.isPeripheralConnected( globalVariables.DEVICE_UUID )
        .catch( error => { console.log( "Could not resolve if device is connected: " + error ) } );
    }
    
    connect ( ) {
        BleManager.connect( globalVariables.DEVICE_UUID )
        .catch( ( error ) => 
        { console.log( "An error occured while connecting to device: " + error ) } );
    }

    reconnect ( ) {
        this.isConnected()
        .then( isConnected => {
            if ( !isConnected ) this.connect();
        } )
    }
    
    retrieveServices ( ) {
        return BleManager.retrieveServices( globalVariables.DEVICE_UUID )
        .catch( error => {
            console.log( "Failed to retreive services: " + error );
            this.reconnect();
        } )
    }

    read ( serviceId, charId ) {
        return new Promise ( ( resolve, reject ) => {
            this.retrieveServices()
            .then( ( ) => {
                BleManager.read( globalVariables.DEVICE_UUID, serviceId, charId )
                .then ( ( result ) => {
                    resolve( bleBinToString( result ) );
                } )
                .catch( error => { console.log( "Failed to read data (inner): " + error ) } );
            } )
        } )
        .catch( error => { console.log( "Failed to read data (outer): " + error ) } );
    }

    write ( serviceId, charId, data ) {
        return new Promise ( ( resolve, reject ) => {
            this.retrieveServices()
            .then( ( ) => {
                BleManager.writeWithoutResponse( globalVariables.DEVICE_UUID, serviceId, charId, stringToBytes( data ) )
                .catch( error => { console.log( "Failed to write data: " + error ) } );
            } )
            .catch( ( error ) => { console.log( "Failed to retreive services: " + error ) } );
        } )
        .catch( error => { console.log( "Failed to read data: " + error ) } );
    }
}

export default BluetoothManager;