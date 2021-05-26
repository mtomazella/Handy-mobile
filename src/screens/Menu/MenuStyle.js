import styled from 'styled-components/native';
import { Drawer } from 'react-native-paper';

export const Overlay = styled.View`
    display: flex;
    flex: 1;
`;

export const LogoSection = styled.View`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    margin-top: 5%;
`;

export const Logo = styled.Image`
    height: 100%;
    margin-top: 40px;
    aspect-ratio: 1;
`;

export const DrawerOptions = styled.View`
    display: flex;
    flex: 4;
    margin-top: 60px;
    font-size: 30px;
    font-weight: 100;
`;

export const Options = styled(Drawer.Item)`
    padding-left: 10%;
`;

export const Hr = styled.View`
    border: #eeeeee 1px solid;
    margin: 20px 0 20px 0;
`;