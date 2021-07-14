import React from 'react'
import styled from 'styled-components/native';
import { Button, Icon } from 'react-native-elements';

export const Main = styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`

export const StatusView = styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const StatusTitle = styled.Text`
    color: #444444;
    font-size: 22px;
    letter-spacing: 5px;
`

export const StatusValue = styled.Text`
    color: #888888;
    font-size: 18px;
    margin-bottom: 20px;
`

export const ButtonsView = styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    width: 80%;
    height: 20%;
    margin-top: 100px;
`

export const NotConnectedView = styled.View`
    position: absolute;
    bottom: 90px;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`

export const CommandButton = props => {
    return (
        <Button
            title = { props.title }
            type = "outline"
            buttonStyle={{
                width: "100%",
                padding: 20,
                borderColor: "#F7C59F",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center"
            }}
            containerStyle={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
            }}
            titleStyle={{
                color: "#F7C59F",
                fontSize: 18,
                letterSpacing: 5
            }}
            onPress={props.onPress}
        />
    )
}