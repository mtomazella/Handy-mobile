import React from 'react'

import { Input, Icon } from 'react-native-elements'

const MaskedInput = ({ 
    mask = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
    placeholder,
    label,
    iconName,
    value = "",
    setValue,
    noMask=false,
    numeric=true
}) => {
    const maskInfo = {};

    function isPastMaxLength ( newValue ) {
        return newValue.length > mask.length;
    }

    function getMaskedCharacters () {
        mask = mask.toLocaleLowerCase();
        for ( let i = 0; i < mask.length; i++ )
            if ( mask[i] != 'x' ) maskInfo[i] = mask[i];
    }

    function maskValueIfNeeded ( newValue ) {
        const i = newValue.length;
        
        /* Tem que ser número */
        if ( numeric && ['1','2','3','4','5','6','7','8','9','0'].indexOf( newValue[i-1] ) == -1 && !maskInfo[i-1] )
        return newValue.substr(0,i-1);
        
        if ( noMask ) return newValue;

            /* Apagar certo */
        if ( value.length > i ) {
            if ( maskInfo[i] ) return newValue.substring(0,i-1)
            else return newValue;
        }
            /* Sla */
        if ( newValue[i] == maskInfo[i] ) return newValue;
            /* Adicionar Simbolo e repete */
        if ( maskInfo[i] ) { 
            return maskValueIfNeeded( (newValue + maskInfo[i]) );
        }
        else return newValue;
    }

    function verifyAndCommitValue ( newValue ) {
        if ( isPastMaxLength( newValue ) ) return;
        newValue = maskValueIfNeeded( newValue );
        setValue( newValue );
    }

    getMaskedCharacters();

    return (
        <Input 
            label={label} 
            placeholder={placeholder}
            leftIcon={
                <Icon 
                    type="feather"
                    name={iconName}
                />
            }
            labelStyle={{
                paddingLeft:20,
            }}
            inputStyle={{
                fontSize: 16
            }}
            containerStyle={{marginTop:20}}
            value={value}
            onChangeText={verifyAndCommitValue}
            keyboardType={(numeric)?"numeric":"default"}
            on
        />
    )
}

export default MaskedInput;