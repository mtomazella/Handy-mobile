import React, { useEffect, useState } from 'react'

import { View } from 'react-native'
import { Icon } from 'react-native-elements'
import Dialog from 'react-native-dialog'

import Toast from './../../../components/Alert'

const Alert = props => {
    const [inputValue, setInputValue] = useState("");

    function inputValidCaracters ( string ) {
        if ( ['1','2','3','4','5','6','7','8','9','0'].indexOf( string[string.length-1] ) == -1 )
            setInputValue( string.substr( 0, string.length-1 ) )
        else setInputValue( string );
    }

    return (
        <View>
          <Dialog.Container visible={props.visible} onBackdropPress={()=>{props.setVisible(false);}}>
            <View style={{display:"flex",flexDirection:"row",justifyContent:"center",marginTop:-20,marginBottom:10}}>
                <Icon type="feather"
                      name={ (props.icon=="angle")?"rotate-cw":(props.icon=="start")?"play":"square" }
                      size={30}
                />
            </View>
            <Dialog.Input onChangeText={inputValidCaracters} value={inputValue} style={{textAlign:"center"}} keyboardType="numeric"/>
            <Dialog.Button style={{color:"#F7C59F"}} label="Cancelar" onPress={()=>{props.setVisible(false);setInputValue( "" )}}/>
            <Dialog.Button style={{color:"#F7C59F"}} label="Salvar" 
                onPress={()=>{
                    if ( inputValue.trim() === '' ) { props.setVisible(false); return; }
                    if ( inputValue.indexOf(".") != -1 || inputValue.indexOf(",") != -1 ) { new Toast( "Valor deve ser um inteiro." ); return; }
                    if ( Number.isNaN( Number.parseInt( inputValue ) ) ) { new Toast( "Valor deve ser um número inteiro." ); return; }
                    try {
                        const intValue = Number.parseInt( inputValue );
                        props.setVisible(false);
                        props.save( intValue );
                        setInputValue( "" )
                    }
                    catch ( err ) {
                        new Toast( "Valor deve ser um número inteiro" );
                    }
                }}
            />
          </Dialog.Container>
        </View>
      );
}

export default Alert;