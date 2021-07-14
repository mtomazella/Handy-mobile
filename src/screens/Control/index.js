import React, { useEffect, useState } from 'react';

import MenuButton from './../../components/MenuButton'
import { Main,
         StatusView,
         StatusTitle,
         StatusValue,
         ButtonsView,
         CommandButton,
         NotConnectedView } from './style'

import NotConnectedMessage from './../../components/NotConnectedMessage'
import handControl from './../../components/HandControl/HandControl'

const Control = ({ navigation }) => {
    const [ data, setData ] = useState( handControl.lastState );
    const [ connected, setConnected ] = useState( handControl.control.connected );
    const [ bluetooth, setBluetooth ] = useState( !handControl.control.bluetoothOff );

    handControl.addListener( 'connect',    () => { setConnected( true  ) } );
    handControl.addListener( 'disconnect', () => { setConnected( false ) } );
    handControl.addListener( 'fetchState',     ( state ) => { setData( state ) } );
    handControl.addListener( 'bluetoothOnOff', ( state ) => { setBluetooth( state ) } );

    return (            
        <Main>
            <NotConnectedView>
                <NotConnectedMessage connected={connected} bluetooth={bluetooth} />
            </NotConnectedView>
            <MenuButton top={120} navigation={navigation} />
            <StatusView>
                <StatusTitle> Modo Ativo </StatusTitle>
                <StatusValue> { data.getModeName() } </StatusValue>

                <StatusTitle> Estado Atual </StatusTitle>
                <StatusValue> { (data.getState())?"Ativado":"Desativado" } </StatusValue>
            </StatusView>
            <ButtonsView>
                <CommandButton title="Alternar Modo" onPress={()=>{handControl.toggleMode()}} />
                <CommandButton title="Alternar Estado" onPress={()=>{handControl.toggleState()}} />
            </ButtonsView>
        </Main>
    )
}

export default Control;