import styled from 'styled-components/native'

export const Main = styled.ScrollView`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`

export const MessageView = styled.View`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    width: 90%;
    background-color: #ff6961;
    border-radius: 10px;
    margin-top: 20px;
`

export const MessageText = styled.Text`
    font-size: 18px;
    color: #fefefe;
    text-align: center;
`

export const InputView = styled.View`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    padding: 20px;
`

export const Hr = styled.View`
    border: #000000 1px solid;
    margin: 20px 0 20px 0;
`;

export const SectionHeader = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: #86939e;
    padding: 20px;
    padding-left: 15px;
    padding-bottom: 10px;
    align-self: flex-start;
`