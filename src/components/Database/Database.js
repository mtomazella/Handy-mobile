import sql from 'react-native-sqlite-storage';

import { Tables } from './Schema';

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
    }

    execute ( query ) {
        this.open()
        .then( db => {
            db.transaction( (tx) => {
                tx.executeSql( query )
                .then(([tx, results]) => {
                    //console.log(results)
                })
                .catch( console.error )
            } )
        } )
        .catch( err => {
            console.error( err )
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