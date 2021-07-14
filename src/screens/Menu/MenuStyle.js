import React from 'react'
import styled from 'styled-components/native';
import { Drawer } from 'react-native-paper';
import { Icon } from 'react-native-elements'
import { View, TouchableOpacity, Text } from 'react-native';

export const Overlay = styled.View`
    display: flex;
    flex: 1;
`;

export const LogoSection = styled.View`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    margin-top: 10%;
    margin-bottom: 10%;
`;

export const Logo = styled.Image`
    height: 100%;
    margin-top: 40px;
    aspect-ratio: 1;
`;

export const DrawerOptions = styled.View`
    display: flex;
    flex: 4;
    margin-top: 60px;
    font-size: 30px;
    font-weight: 100;
`;

export const Options = styled(Drawer.Item)`
    padding-left: 10%;
`;

export const BottomOptions = styled.View`
    position: absolute;
    bottom: 0px;
    left: 0px;
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 20px;
`

export const IconOption = ({ label, iconName, onPress, textColor = "#666666", iconSize = 23 }) => {
    return (
        <TouchableOpacity style={{
            display:'flex',
            flexDirection:'row',
            alignItems: 'center',
            paddingLeft: 20,
            marginBottom: 10
        }}
        onPress={onPress} >
            <Icon 
                type="feather"
                name={iconName}
                size={iconSize}
                color="#F7C59F"
                containerStyle={{
                    padding: 5,
                    paddingRight: 15
                }}
            />
            <Text style={{
                fontSize:18,
                color:textColor
            }}> {label} </Text>
        </TouchableOpacity>
    )
}

export const Hr = styled.View`
    border: #eeeeee 1px solid;
    margin: 20px 0 20px 0;
`;