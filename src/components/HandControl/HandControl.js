/* eslint-disable prettier/prettier */
import BluetoothManager from './BluetoothManager';
import HandData         from './HandData';
import Alert            from './../Alert';

import { ToastAndroid } from 'react-native';

import db from './../Database/DatabaseManager'
import config from './../../components/Config'

class HandControl {
    lastState = new HandData(); 

    constructor ( ) {
        this.control = new BluetoothManager( );
        setInterval( () => {
            this.getState();
        }, 10000 )
    }

    getState ( ) {
        return new Promise( ( resolve, reject ) => {
            this.control.read( config.FULLSTATE_SERVICE_UUID, config.FULLSTATE_CHAR_UUID )
            .then( ( data ) => {
                this.lastState = new HandData( data );
                this.control.evSys.triggerEvent( 'fetchState', this.lastState );
                resolve( this.lastState )
            } )
            .catch(err => {console.info(err);}) // Esse catch pode quebrar alguma coisa, cuidado
        } )
        .catch( ( error ) => {
            // console.error( error );
            new Alert( "Falha ao receber dados.", ToastAndroid.SHORT );
        } )
    }

    toggleState ( ) {
        this.control.read( config.GETTER_SERVICE_UUID, config.STATE_CHAR_UUID )
        .then( ( ) => { console.log( "State toggle" ); this.getState() } )
        .catch( ( error ) => {
            new Alert( "Falha ao alterar estado" );
            console.info( "Toggle state error: " + error );
        } )
    }

    writeState ( state ) {
        // TODO
    }

    toggleMode ( ) {
        this.control.read(config.GETTER_SERVICE_UUID,config.MODE_CHAR_UUID )
        .then( ( ) => { console.log( "Mode toggle" ); this.getState() } )
        .catch( ( error ) => {
            new Alert( "Falha ao alterar modo." );
            console.info( "Toggle mode error: " + error );
        } )
    }

    fetchAndWriteModes ( ) {
        db.fetchModes()
        .then( modes => {
            const activeModes = modes.filter( mode => ( mode.active ) );
            const toSend = activeModes.map( mode => mode.generateBleString() ).join("|")+"#";
            this.control.write( config.GETTER_SERVICE_UUID, config.MODE_CHAR_UUID, toSend )
            .catch( error => {
                new Alert( "Falha ao enviar modos." );
                console.info( error );
            } )
        } )
        .catch( error => {
            new Alert( "Falha ao enviar modos." )
            console.error( error )
        } )
    }

        /* Event system */
    addListener ( event, callback ) {
        this.control.evSys.addListener( event, callback );
    }
}

export default new HandControl();