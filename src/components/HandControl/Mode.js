export default class {
    id;
    name;
    states = { open: [], closed: [] };
    active;

    initFromObject ( obj ) {
        Object.keys( obj ).forEach( key => {
            this[key] = obj[key]
        } )
        return this;
    }
    initFromDb ( dbData ) {
        if ( !dbData ) return this;
        this.id = dbData.id;
        this.name = dbData.name;
        this.active = dbData.active;
        this.states.open = this.parseDbState( dbData.open );
        this.states.closed = this.parseDbState( dbData.closed );
        return this;
    }

    getStateString ( state ) {
        const fingers = [ ];
        this.states[(state)?"closed":"open"].forEach( finger => {
            fingers.push( `${finger.angle}.${finger.start}.${finger.duration}` );
        } );
        return fingers.join(",");
    }
    generateDatabaseQuery ( ) {
        return `INSERT OR REPLACE INTO modes VALUES ( ${(this.id!=undefined)?this.id:null}, "${this.name}", "${this.getStateString(false)}", "${this.getStateString(true)}", ${(this.active)?1:0} );`
    }
    generateBleString ( ) {
        return `${this.name};${this.getStateString(false)};${this.getStateString(true)}`;
    }

    parseDbState ( state ) {
        const result = [ ];
        const fingers = state.split(",");
        fingers.forEach( finger => {
            const info = finger.split(".");
            result.push( {
                angle: info[0],
                start: info[1],
                duration: info[2]
            } )
        } )
        return result;
    }
}