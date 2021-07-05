import Database from './Database'

import generateMode from './../Debug/modeFactory'
import Mode from '../HandControl/Mode';
import { baseProps } from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlers';

export default class {
    constructor ( ) {
        this.db = new Database();
    }

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
}