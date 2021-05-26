import styled from "styled-components/native";

import { Button } from "react-native-paper";

export const Background = styled.View`
    display: flex;
    flex: 1;
    justify-content: space-around;
    align-items: center;
    background-color: white;
`;

export const State = styled.View`
    margin: 0px 0 40px 0;
    padding-left: 20px;
    width: 100%;
`;

export const StateAttribute = styled.Text`
    font-size: 20px;
`;

export const StyledButton = styled( Button )`
    width: 80%;
    margin-top: 20px;
`;

export const ButtonView = styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`;