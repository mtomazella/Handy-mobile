import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';



const Drawer = createDrawerNavigator();

import Home from '../screens/Home';
import Modes from '../screens/Modes';
import Menu from '../screens/Menu';
import Edit from '../screens/EditMode';

/* Debug */
import BleController from '../screens/BleController';

function AppNavigator() {
    return (
        <NavigationContainer>
            <Drawer.Navigator drawerContent={props => <Menu {...props} />}>
                <Drawer.Screen name="Home" component={Home} />
                <Drawer.Screen name="Modes" component={Modes} />
                <Drawer.Screen name="Add" component={Edit} />
                <Drawer.Screen name="Edit" component={Edit} />
                {/* Debug */}
                <Drawer.Screen name="BleController" component={BleController} />
            </Drawer.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator;