import { ToastAndroid } from 'react-native';

function alert ( message, duration = ToastAndroid.SHORT ) {
    ToastAndroid.showWithGravity( message, duration, ToastAndroid.BOTTOM );
}

export default alert;