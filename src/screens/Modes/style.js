import styled from 'styled-components/native';

export const Main = styled.View`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-content: center;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0 0 20px 0;
`

export const TitleView = styled.View`
    display: flex;
    flex-direction: row;
    align-content: center;
    padding: 20px 0 20px 50px;
`

export const Title = styled.Text`
    color: #555555;
    font-size: 30px;
    padding-left: 10px;
`

export const ButtonsView = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    margin: 0;
    padding: 0 0 0 15px;
`