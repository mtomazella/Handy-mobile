import React from 'react';

import { BatteryDisplayView, BatteryDisplayImage, BatteryDisplayPercentage } from './BatteryDisplayStyle';

import battery0   from './assets/battery-0.png'  ;
import battery75  from './assets/battery-75.png' ;
import battery50  from './assets/battery-50.png' ;
import battery25  from './assets/battery-25.png' ;
import battery100 from './assets/battery-100.png';

function determineClosestImage ( percentage ) {
    const availableImages = [ 0, 25, 50, 75, 100 ];
    if ( percentage === undefined || (availableImages.indexOf( 0 ) !== -1 && percentage === 0) ) return percentage;
    for ( let i = 0; i < availableImages.length-1; i++ ) {
        if ( availableImages[i] < percentage && percentage <= availableImages[i+1] ) {
            return ( percentage - availableImages[i] <= availableImages[i+1] - percentage ) ? availableImages[i] : availableImages[i+1];
        }
    }
}

const percentageToImageMap = {
    0:   battery0,
    25:  battery25,
    50:  battery50,
    75:  battery75,
    100: battery100
}

const BatteryDisplay = props => {
    const percentage = props.percentage | 25;
    const batteryImage  = percentageToImageMap[determineClosestImage( percentage )];
    return ( 
        <BatteryDisplayView>
            <BatteryDisplayImage source={batteryImage}/>
            <BatteryDisplayPercentage> {percentage}% </BatteryDisplayPercentage>
        </BatteryDisplayView>
    );
}

export default BatteryDisplay;