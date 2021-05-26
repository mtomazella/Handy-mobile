import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

import Home from '../screens/Home';
import Modes from '../screens/Modes';
import Menu from '../screens/Menu';

/* Debug */
import BleController from '../screens/BleController';

function AppNavigator() {
    return (
        <NavigationContainer>
            <Drawer.Navigator drawerContent={props => <Menu {...props} />}>
                <Drawer.Screen name="Home" component={Home} />
                <Drawer.Screen name="Modes" component={Modes} />
                {/* Debug */}
                <Drawer.Screen name="BleController" component={BleController} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator;