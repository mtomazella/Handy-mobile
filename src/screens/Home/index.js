/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';

import BatteryDisplay from './../../components/BatteryDisplay/BatteryDisplay';

import { Background } from './HomeStyle';

import HandControl from './../../components/HandControl/HandControl'

const handControl = new HandControl();

function getBateryLevel ( ) {
    
}

const Home = props => {    
    const [batteryLevel, setBatteryLevel] = useState('');
    
    useEffect(() => {
        setInterval( async () => {
            handControl.getState()
            .then( data => {
                const newState = data.getBattery();
                if ( newState != batteryLevel ) setBatteryLevel( newState );
            } )
            .catch( console.log )
        }, handControl.control.intervalDelay );        
    }, [batteryLevel]);

    return (
        <Background>
            <BatteryDisplay percentage={batteryLevel} />
        </Background> 
    )
}

export default Home;