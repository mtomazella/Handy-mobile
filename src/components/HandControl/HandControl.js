/* eslint-disable prettier/prettier */
import globalVariables  from '../../global_variables.json';
import BluetoothManager from './BluetoothManager';
import HandData         from './HandData';
import Database         from './../Database/DatabaseManager'
import Alert            from './../Alert';

import { ToastAndroid } from 'react-native';

const db = new Database();

class HandControl {
    constructor ( ) {
        this.control = new BluetoothManager( );
    }

    getState ( ) {
        return new Promise( ( resolve, reject ) => {
            this.control.read( globalVariables.FULLSTATE_SERVICE_UUID, globalVariables.FULLSTATE_CHAR_UUID )
            .then( ( data ) => {
                resolve( new HandData( data ) )
            } )
        } )
        .catch( ( error ) => {
            console.error( error );
            new Alert( "Falha ao receber dados.", ToastAndroid.SHORT );
        } )
    }

    toggleState ( ) {
        this.control.read( globalVariables.GETTER_SERVICE_UUID, globalVariables.STATE_CHAR_UUID )
        .then( ( ) => { console.log( "State toggle" ) } )
        .catch( ( error ) => {
            new Alert( "Falha ao alterar estado" );
            console.warn( "Toggle state error: " + error );
        } )
    }

    writeState ( state ) {
    }

    toggleMode ( ) {
        this.control.read( globalVariables.GETTER_SERVICE_UUID, globalVariables.MODE_CHAR_UUID )
        .then( ( ) => { console.log( "Mode toggle" ) } )
        .catch( ( error ) => {
            new Alert( "Falha ao alterar modo" );
            console.warn( "Toggle mode error: " + error );
        } )
    }

    fetchAndWriteModes ( ) {
        db.fetchModes()
        .then( modes => {
            const activeModes = modes.filter( mode => ( mode.active ) );
            const toSend = activeModes.map( mode => ( mode.generateBleString() ) ).join("|");
            this.control.write( globalVariables.GETTER_SERVICE_UUID, globalVariables.MODE_CHAR_UUID, toSend )
        } )
        .catch( error => {
            new Alert( "Falha ao enviar modos." )
            console.error( error )
        } )
    }
}

export default new HandControl();