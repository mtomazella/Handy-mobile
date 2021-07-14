import React from 'react';
import globalVariables from './../../global_variables.json'
import { Overlay, 
         LogoSection, 
         Logo, 
         DrawerOptions, 
         BottomOptions,
         IconOption } from './MenuStyle';

import { Linking } from 'react-native';

import handyLogo from './img/handyLogo.png';

const Menu = props => {
    return (
        <Overlay>
            <LogoSection>
                <Logo source={handyLogo} />
            </LogoSection>
            <DrawerOptions>
                <IconOption
                    label="Início"
                    onPress={() => props.navigation.navigate('Home')} 
                    iconName="home"
                />
                <IconOption
                    label="Modos"
                    onPress={() => props.navigation.navigate('Modes')}
                    iconName="sliders"
                />
                <IconOption
                    label="Controle"
                    onPress={() => props.navigation.navigate('Control')}
                    iconName="radio"
                />

                <BottomOptions>
                    <IconOption 
                        iconSize={26} 
                        iconName="settings" 
                        onPress={ () => props.navigation.navigate('Config') }
                    />
                    <IconOption 
                        iconSize={26} 
                        iconName="help-circle" 
                        onPress={ () => Linking.openURL( globalVariables.SITE_URL ) }
                    />
                </BottomOptions>
            </DrawerOptions>
        </Overlay>
    )
}

export default Menu;