import React from 'react';

import BatteryDisplay from './../../components/BatteryDisplay/BatteryDisplay';

import { Background, Text } from './HomeStyle';

const Home = props => {
    return (
        <Background>
            <BatteryDisplay />
        </Background>
    )
}

export default Home;