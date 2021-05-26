import React, { useEffect } from 'react';

import { State, 
         StateAttribute, 
         Background, 
         StyledButton, 
         ButtonView } from "./style";

import HandControl from './../../components/HandControl/HandControl';

const handControl = new HandControl( );

const Home = props => {    
    return (
        <Background>
            <State>
                <StateAttribute> Battery: {props.battery_level} </StateAttribute>
                <StateAttribute> State:   {props.state}         </StateAttribute>
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

export default Home;