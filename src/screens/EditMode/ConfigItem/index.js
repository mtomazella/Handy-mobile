import React from 'react'

import Dialog from 'react-native-dialog'
import { View } from 'react-native'
import { Icon } from 'react-native-elements'
import { Main, 
         Number,
         ConfigButton, 
         ConfigButtonView, 
         ConfigButtonText,
         ConfigButtonIconView,
         ConfigButtonIconText } from './style'

const ConfigItem = props => {
    return (
        <Main>
            <View style={{width:"15%",display:"flex",flexDirection:"row",justifyContent:"center"}} >
                <Number>{ props.number }</Number>
            </View>
            <ConfigButton
                onPress={()=>{ props.openDialog(); props.setDialogInfo({ state: props.state, finger: props.number-1, property: "angle" }) }}
            >
                <ConfigButtonView>
                    <ConfigButtonIconView>
                        <Icon
                            type="feather"
                            name="rotate-cw"
                            size={20}
                            color="#888888"
                        />
                    </ConfigButtonIconView>
                    <ConfigButtonText> {props.angle|"?"}º </ConfigButtonText>
                </ConfigButtonView>
            </ConfigButton>
            <ConfigButton
                onPress={()=>{ props.openDialog(); props.setDialogInfo({ state: props.state, finger: props.number-1, property: "start" }) }}
            >
                <ConfigButtonView>
                    <Icon
                        type="feather"
                        name="play"
                        size={20}
                        color="#888888"
                    />
                    <ConfigButtonText> {props.start|"?"} </ConfigButtonText>
                </ConfigButtonView>
            </ConfigButton>
            <ConfigButton
                onPress={()=>{ props.openDialog(); props.setDialogInfo({ state: props.state, finger: props.number-1, property: "duration" }) }}
            >
                <ConfigButtonView>
                    <Icon
                        type="feather"
                        name="square"
                        size={20}
                        color="#888888"
                    />
                    <ConfigButtonText> {props.duration|"?"} </ConfigButtonText>
                </ConfigButtonView>
            </ConfigButton>
        </Main>
    )
}

export default ConfigItem;


const Alert = props => {
    return (
        <View>
          <Dialog.Container>
            <Dialog.Title>Account delete</Dialog.Title>
            <Dialog.Description>
              Do you want to delete this account? You cannot undo this action.
            </Dialog.Description>
            <Dialog.Button label="Cancel" />
            <Dialog.Button label="Delete" />
          </Dialog.Container>
        </View>
      );
}