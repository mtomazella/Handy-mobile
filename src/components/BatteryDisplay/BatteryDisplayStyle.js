import styled from 'styled-components/native';

export const BatteryDisplayView = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const BatteryDisplayImage = styled.Image`
    height: 50%;
    margin-top: 40px;
    aspect-ratio: 0.53;
`;

export const BatteryDisplayPercentage = styled.Text`
    position: absolute;    
    margin-top: 20px;
    font-size: 20px;
`;