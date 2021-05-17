import React from 'react';
import { Overlay, LogoSection, Logo, DrawerOptions, Options } from './MenuStyle';

import handyLogo from './img/handyLogo.png';

const Menu = props => {
    return (
        <Overlay>
            <LogoSection>
                <Logo source={handyLogo} />
            </LogoSection>
            <DrawerOptions>
                <Options
                    label="Home"
                    onPress={() => props.navigation.navigate('Home')} 
                />
                <Options
                    style={{ fontSize: 50 }}
                    label="Modes"
                    onPress={() => props.navigation.navigate('Modes')}
                />
            </DrawerOptions>
        </Overlay>
    )
}

export default Menu;