import Toast from './../Alert'

import db from './../Database/DatabaseManager'

class Config {
    constructor () {
        this.initFromDatabase();
    }

    initFromDatabase () {
        db.fetchConfig()
        .then( configObj => {
            Object.keys( configObj ).forEach( config => {
                this[config] = configObj[config];
            } )
        } )
        .catch( error => {
            console.error( error );
            new Toast( "Falha ao iniciar configurações." )
        } )
    }

    reinit () {
        this.initFromDatabase();
    }
}

export default new Config();