import styled from 'styled-components/native'

export const Main = styled.View`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;  
` 

export const TabButtonView = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
`

export const ConfigView = styled.ScrollView`
    display: flex;
    flex-direction: column;
    width: 100%;
`

export const ConfigLabelsView = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    padding: 0 20px 0 25px;
`

export const ConfigLabelContainer = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 30%;
`

export const ConfigLabel = styled.Text`
    font-size: 10px;
    color: #888888;
`