/* eslint-disable prettier/prettier */
import globalVariables from '../../global_variables.json';
import BluetoothManager from './BluetoothManager';
import HandData from './HandData';

class HandControl {
    constructor ( ) {
        this.control = new BluetoothManager( );
    }

    getState ( ) {
        return new Promise( async (resolve, reject) => {
            this.control.read( globalVariables.FULLSTATE_SERVICE_UUID,globalVariables.FULLSTATE_CHAR_UUID )
            .then( data => {
                resolve( new HandData( data ) );
            } )
        } )
    }

    toggleState ( ) {
        this.control.read( globalVariables.GETTER_SERVICE_UUID, globalVariables.STATE_CHAR_UUID );
    }

    writeState ( state ) {
        this.control.write( globalVariables.GETTER_SERVICE_UUID, globalVariables.STATE_CHAR_UUID, state );
    }

    toggleMode ( ) {
        this.control.read( globalVariables.GETTER_SERVICE_UUID, globalVariables.MODE_CHAR_UUID );
    }

    writeModes ( ) {
        // TODO
    }
}

export default HandControl;