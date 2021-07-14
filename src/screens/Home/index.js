/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import { Icon } from 'react-native-elements';

import BatteryDisplay from './../../components/BatteryDisplay/BatteryDisplay';
import MenuButton from './../../components/MenuButton';
import NotConnectedMessage from '../../components/NotConnectedMessage';

import { Background } from './HomeStyle';

import handControl from './../../components/HandControl/HandControl'
import db from './../../components/Database/DatabaseManager'

const Home = ({ navigation }) => {    
    const [batteryLevel, setBatteryLevel] = useState('');
    const [connected, setConnected] = useState(false);
    const [ bluetooth, setBluetooth ] = useState( !handControl.control.bluetoothOff );
    
    handControl.addListener( 'connect',    () => { setConnected( true  ) } );
    handControl.addListener( 'disconnect', () => { setConnected( false ) } );
    handControl.addListener( 'fetchState',     ( state ) => { setBatteryLevel( state.getBattery() ) } ) ;
    handControl.addListener( 'bluetoothOnOff', ( state ) => { setBluetooth( state ) } );

    return (
        <Background>
            <MenuButton navigation={navigation} top={120}/>
            <BatteryDisplay percentage={batteryLevel} />
            <NotConnectedMessage connected={connected} bluetooth={bluetooth} />
        </Background> 
    )
}

export default Home;