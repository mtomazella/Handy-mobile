import styled from 'styled-components/native'

export const Main = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    padding-right: 30px;
`

export const Number = styled.Text`
    font-size: 30px;
    color: #888888;
`

export const ConfigButton = styled.TouchableOpacity`
    width: 30%;
`

export const ConfigButtonView = styled.View`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

export const ConfigButtonIconView = styled.View`
    display: flex;
    flex-direction: row;
`

export const ConfigButtonIconText = styled.Text`
    color: #888888;
    font-size: 15px;
`

export const ConfigButtonText = styled.Text`
    color: #888888;
    font-size: 20px;
`