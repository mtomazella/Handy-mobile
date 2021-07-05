/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import { Icon } from 'react-native-elements';

import BatteryDisplay from './../../components/BatteryDisplay/BatteryDisplay';
import MenuButton from './../../components/MenuButton';

import { Background, 
         NotConnectedView,
         NotConnectedText } from './HomeStyle';

import DatabaseManager from './../../components/Database/DatabaseManager';
import handControl from './../../components/HandControl/HandControl'

const db = new DatabaseManager();


const Home = ({ navigation }) => {    
    const [batteryLevel, setBatteryLevel] = useState('');
    const [connected, setConnected] = useState(false);
    
    useEffect(() => {
        const interval = setInterval( async () => {
            if ( handControl.control.connected != connected ) setConnected(handControl.control.connected);
            handControl.getState()
            .then( ( data ) => {
                if ( !data ) return;
                setBatteryLevel( data.getBattery() )
                clearInterval( interval );
            } )
        }, 5000 );        
    }, [batteryLevel]);

    return (
        <Background>
            <MenuButton navigation={navigation} top={120}/>
            <BatteryDisplay percentage={batteryLevel} />
            <NotConnectedView style={{display:(!connected)?"flex":"none"}}>
                <Icon type="feather" name="alert-circle" color="red" />
                <NotConnectedText> Não Conectado! </NotConnectedText>
            </NotConnectedView>
        </Background> 
    )
}

export default Home;