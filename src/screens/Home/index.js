import React, { useEffect } from 'react';
import {
    NativeModules,
    NativeEventEmitter,
    Platform,
    PermissionsAndroid
} from 'react-native';

import {Buffer} from "buffer";

import globalVariables from "../../global_variables.json";

import BatteryDisplay from './../../components/BatteryDisplay/BatteryDisplay';

import BleManager from 'react-native-ble-manager';
const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

import { Background, Text } from './HomeStyle';

const Home = props => {    
    useEffect(() => {
        BleManager.start({ showAlert: false });

        /* Pedindo permissão */

        if (Platform.OS === 'android' && Platform.Version >= 23) {
            PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
                if (result) {
                    console.log("Permission is OK");
                } else {
                    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
                    if (result) {
                        console.log("User accept");
                    } else {
                        console.log("User refuse");
                    }
                    });
                }
            });
        }  

        BleManager.getBondedPeripherals([]).then((bondedPeripheralsArray) => {
            const hand = bondedPeripheralsArray.filter( (p => p.id == globalVariables.DEVICE_UUID ) );
            console.log( hand );
        });

        BleManager.connect( globalVariables.DEVICE_UUID )
            .then( () => {

                    BleManager.retrieveServices( globalVariables.DEVICE_UUID ).then(
                        (peripheralInfo) => {
                            // Success code
                            // console.log(peripheralInfo.characteristics);
                        }
                    );

            } )
            .catch( console.log )

        setTimeout( () => {

            BleManager.read( globalVariables.DEVICE_UUID, globalVariables.FULLSTATE_SERVICE_UUID, globalVariables.FULLSTATE_CHAR_UUID )
                .then( result => console.log( "read: " + Buffer.from( result ).toString() ) )
                .catch((error) => {
                    console.log("read: " + error);
                });

        }, 1000 );
        
    }, []);

    // 2d0ec625-d550-4ed3-8068-def71c9aa7ee

    return (
        <Background>
            <BatteryDisplay />
        </Background>
    )
}

export default Home;