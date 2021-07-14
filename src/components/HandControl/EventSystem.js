
export default class {
    callbacks = {
        disconnect:     [],
        connect:        [],
        fetchState:     [],
        bluetoothOnOff: []
    }

    addListener ( event, callback ) {
        this.callbacks[event].push(callback);
    }

    triggerEvent ( event, value ) {
        this.callbacks[event].forEach( callback => { callback( (value)?value:null ); } )
    }
}