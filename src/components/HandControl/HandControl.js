import globalVariables from '../../global_variables.json';
import BluetoothManager from './BluetoothManager';

class HandControl {
    constructor ( ) {
        this.control = new BluetoothManager( );
    }

    getState ( ) {
        return this.control.read( globalVariables.FULLSTATE_SERVICE_UUID,globalVariables.FULLSTATE_CHAR_UUID );
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