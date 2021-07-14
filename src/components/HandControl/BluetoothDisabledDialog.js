import { Alert } from 'react-native'
import BluetoothStateManager from 'react-native-bluetooth-state-manager';

import handControl from './HandControl'


const BluetoothDisabledDialog = ( ) => {
    Alert.alert( 
        "Bluetooth Desligado",
        "Gostaria de ligar o Bluetooth para se comunicar com a prótese? Isso é necessário para grande parte das funções.",
        [
            {
                text: "Cancelar",
                style: "cancel"
            },
            {
                text: "Ativar",
                onPress: () => { BluetoothStateManager.enable()
                    .catch( error => { console.error( "Failed to enable Bluetooth." ); console.error(error) } ) 
                }
            }
        ],
        { cancelable: true }
    )
}

export default BluetoothDisabledDialog;