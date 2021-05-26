import React, { useEffect } from 'react';

import { Button } from 'react-native'

import HandControl from './HandControl';

const handControl = new HandControl( );

function displayState ( ) {
    handControl.getState()
    .then( result => { console.log( "state: " + result ) } );
}

const BluetoothManager = ( props ) => {
    return (
        <>
        <Button title="Get State" onPress={displayState}/>
        <Button title="Toggle State" onPress={handControl.toggleState.bind(handControl)}/>
        </>
    )
}

export default BluetoothManager;