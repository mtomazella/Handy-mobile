import Database from './Database'

import generateMode from './../Debug/modeFactory'
import Mode from '../HandControl/Mode';

class DatabaseManager {
    constructor ( ) {
        this.db = new Database();
    }

        /* Modes */

    fetchModes ( ) {
        return new Promise ( ( resolve, reject ) => {
            this.db.fetch( 'SELECT * FROM modes;' )
            .then( result => {
                const modes = [ ];
                for ( i = 0; result.rows.item(i) != null; i++ )
                    modes.push( new Mode().initFromDb( result.rows.item(i) ) );
                resolve( modes );
            } )
            .catch( reject )
        } )
    }

    fetchModeById ( id ) {
        return new Promise ( ( resolve, reject ) => {
            this.db.fetch( `SELECT * FROM modes WHERE id = ${id};` )
            .then( ( result ) => {
                resolve( new Mode().initFromDb( result.rows.item(0) ) )
            } )
            .catch( reject )
        } )
    }

    addMode ( mode ) {
        this.db.execute( mode.generateDatabaseQuery() )
    }

    deleteMode ( id ) {
        this.db.execute( `DELETE FROM modes WHERE id = ${id};` );
    }

        /* Config */

    fetchConfig () {
        return new Promise ( ( resolve, reject ) => {
            this.db.fetch( 'SELECT * FROM config;' )
            .then( result => {
                const configObj = {};
                for ( i = 0; result.rows.item(i) != null; i++ ) {
                    const item = result.rows.item(i);
                    configObj[item.key] = item.value;
                }
                resolve( configObj );
            } )
            .catch( reject );
        } )
    }

    saveConfig ( key, value ) {
        return this.db.fetch( `INSERT OR REPLACE INTO config VALUES ( "${key}", "${value}" );` )
    }
}

export default new DatabaseManager();