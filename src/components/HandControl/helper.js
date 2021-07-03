import {
    NativeModules,
    NativeEventEmitter,
    Platform,
    PermissionsAndroid
} from 'react-native';
import { Buffer } from "buffer";

export function askForPermition ( ) {
    return new Promise ( ( resolve, reject ) => {
        if (Platform.OS === 'android' && Platform.Version >= 23) {
            PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
                if (result) {
                    resolve(true);
                    console.log("Permission is OK");
                } else {
                    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION).then((result) => {
                    if (result) {
                        resolve(true);
                        console.log("User accept");
                    } else {
                        resolve(false);
                        console.log("User refuse");
                    }
                    });
                }
            });
        }  
    } )
}

export function bleBinToString ( message ) {
    return Buffer.from( message ).toString();
}

export function isHandConnected ( BleManager, handUuid ) {
    BleManager.getBondedPeripherals([]).then((bondedPeripheralsArray) => {
        const hand = bondedPeripheralsArray.filter( (p => p.id == handUuid ) );
        console.log( hand );
    });
}