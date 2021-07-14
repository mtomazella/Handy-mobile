import React from 'react'

import { Icon } from 'react-native-elements'
import { NotConnectedView,
         NotConnectedText } from './style'

const NotConnectedMessage = props => {
    return (
        <>
            <NotConnectedView style={{display:(!props.connected||!props.bluetooth)?"flex":"none"}}>
                <Icon type="feather" name="alert-circle" color="red" />
                <NotConnectedText> Não Conectado! </NotConnectedText>
            </NotConnectedView>
            <NotConnectedView style={{display:(!props.bluetooth)?"flex":"none", paddingTop: 5}}>
                <Icon type="material" name="bluetooth-disabled" color="red" />
                <NotConnectedText> Bluetooth Desativado! </NotConnectedText>
            </NotConnectedView>
        </>
    )
}

export default NotConnectedMessage;