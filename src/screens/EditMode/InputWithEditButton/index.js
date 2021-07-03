import React, { useState } from 'react'
import { Icon, Input } from 'react-native-elements'

const InputWithEditButton = props => {
    const [ text, setText ] = useState( props.name );
    const [ open, setOpen ] = useState(false);
    const [ iconName, setIconName ] = useState("edit-3")

    return (
        <Input
            rightIcon={
                <Icon 
                    type="feather"
                    name={iconName}
                    color="#888888"
                    size={30}
                    containerStyle={{
                        paddingRight:10
                    }}
                    onPress={ () => {
                        setOpen( !open );
                        setIconName( (!open)?"check":"edit-3" );
                        props.setName( text );
                    } }
                />
            }  
            containerStyle={{
                padding:10,
            }}
            inputStyle={{
                color:"#111111",
                fontWeight:"800",
                fontSize:25,
                paddingLeft:30
            }} 
            disabled={!open}
            defaultValue={props.name}
            onChangeText={setText}
        />
    )
}

export default InputWithEditButton