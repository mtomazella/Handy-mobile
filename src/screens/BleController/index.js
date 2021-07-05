/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';

import { State, 
         StateAttribute, 
         Background, 
         StyledButton, 
         ButtonView } from "./style";

import handControl from './../../components/HandControl/HandControl'

const BleController = props => {
    const [batteryLevel, setBatteryLevel] = useState('');
    
    // useEffect(() => {
    //     setInterval( async () => {
    //         handControl.getState()
    //         .then( data => {
    //             const newState = data.getBattery();
    //             if ( newState != batteryLevel ) setBatteryLevel( newState );
    //         } )
    //     }, handControl.control.intervalDelay );        
    // }, [batteryLevel]);
    
    return (
        <Background>
            <State>
                <StateAttribute> Battery: {batteryLevel} </StateAttribute>
                {/* <StateAttribute> State:   {state}         </StateAttribute> */}
            </State>
            <ButtonView>
                <StyledButton mode="contained">
                    Get State
                </StyledButton>
                <StyledButton mode="contained" onPress={handControl.toggleState.bind(handControl)}>
                    Toggle State
                </StyledButton>
                <StyledButton mode="contained" onPress={handControl.toggleMode.bind(handControl)}>
                    Toggle Mode
                </StyledButton>
            </ButtonView>
        </Background>
    )
}

export default BleController;