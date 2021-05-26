import React from 'react';

import BatteryDisplay from './../../components/BatteryDisplay/BatteryDisplay';

import { Background } from './HomeStyle';

const Home = props => {    
    return (
        <Background>
            <BatteryDisplay />
        </Background> 
    )
}

export default Home;