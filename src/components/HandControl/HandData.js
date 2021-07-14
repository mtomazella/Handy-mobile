/* eslint-disable prettier/prettier */
export default class HandData {
    uData;
    _data = { 
        battery_level:  0,
        state:          0,
        mode_index:     0,
        mode_name:      "Desconhecido"
    };
    constructor ( data ) {
        if ( !data ) return;
        this.uData = data;
        this.parse(data);
    }

    // battery_display:100,state:0,mode_index:0,mode_name:mindinho
    parse ( data ) {
        if ( data == null ) return;
        const element = data.split(",");
        element.forEach( e => {
            const info = e.split( ":" );
            this._data[info[0]] = info[1];
        } )
    }
    
    getBattery ( ) {
        return this._data["battery_level"];
    }

    getState ( ) {
        return (this._data.state == 1)?true:false;
    }

    getModeName ( ) {
        return this._data["mode_name"];
    }
}