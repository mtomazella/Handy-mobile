import React from 'react'

import { View, Text } from 'react-native'
import { Icon } from 'react-native-elements'
import Dialog from 'react-native-dialog'

const Alert = props => {
    return (
        <View>
          <Dialog.Container visible={props.visible} onBackdropPress={()=>{props.setVisible(false);}}>
            <View style={{display:"flex",flexDirection:"column",alignItems:"center",marginTop:-20,marginBottom:10}}>
                <Icon type="feather"
                      name="trash-2"
                      size={30}
                      color="red"
                      containerStyle={{marginBottom:10}}
                />
                <Text style={{textAlign:"center"}}> Tem certeza que deseja deletar o modo? </Text>
                <Text style={{textAlign:"center"}}> Essa ação não pode ser desfeita. </Text>
            </View>
            <Dialog.Button style={{color:"red"}} label="Cancelar" onPress={()=>{props.setVisible(false);}}/>
            <Dialog.Button style={{color:"red"}} label="Exluir" onPress={()=>{props.setVisible(false);props.delete()}}/>
          </Dialog.Container>
        </View>
      );
}

export default Alert;