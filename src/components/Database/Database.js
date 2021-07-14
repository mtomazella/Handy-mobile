import sql from 'react-native-sqlite-storage';

import globalVariables from './../../global_variables.json'
import { Tables, ConfigKeys } from './Schema';

export default class {
    constructor ( ) {
        sql.enablePromise(true);
        this.init();
    }

    open ( ) {
        return new Promise( ( resolve, reject ) => {
            sql.openDatabase( { name:"Handy", location:"default" } )
            .then( resolve )
            .catch( err => {
                console.error( "Database failed to open", err );
                reject( err )
            } )
        } )
    }

    init ( ) {
        const tables = Object.keys( Tables );
        tables.forEach( tableName => {

            const table = Tables[tableName];

            let query = `CREATE TABLE IF NOT EXISTS "${tableName}" `

            const createStatments = [ ];
            
            const fields = Object.keys( table.fields )
            fields.forEach( fieldName => {
                const field = table.fields[fieldName];
                const statement = ` "${fieldName}" ${field.datatype}${(field.primaryKey)?" PRIMARY KEY":""}${(field.autoIncrement)?" AUTOINCREMENT":""}${(field.notNull)?" NOT NULL":""}`
                createStatments.push( statement );
            } )

            query += `(${createStatments.join( "," )})`;

            this.execute( query );
        });

        this.initConfigTable()
    }

    initConfigTable () {
        ConfigKeys.forEach( key => {
            this.fetch( `SELECT * FROM config WHERE key = "${key}";` )
            .then( result => {
                if ( result.rows.length < 1 ) {
                    this.execute( `INSERT INTO config VALUES ( "${key}", "${globalVariables[key]}" );`, true)
                }
            } )
        } )
    }

    execute ( query, ignoreError = false ) {
        this.open()
        .then( db => {
            db.transaction( (tx) => {
                tx.executeSql( query )
                .then(([tx, results]) => {
                    //console.log(results)
                })
            } )
        } )
        .catch( err => {
            if ( !ignoreError ) console.error( err );
        } )
    }

    fetch ( query ) {
        return new Promise ( ( resolve, reject ) => {
            this.open()
            .then( db => {
                db.transaction( (tx) => {
                    tx.executeSql( query )
                    .then(([tx, results]) => {
                        resolve(results);
                    })
                    .catch( reject )
                } )
            } )
            .catch( err => {
                console.error( `Failed to fetch data: ${err}` );
                reject( err );
            } )
        } )
    }
}