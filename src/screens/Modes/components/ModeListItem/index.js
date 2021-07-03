import React from 'react'
import { Icon } from 'react-native-elements'

import { Button, Text } from './style'

const ModeListItem = props => {
    return (
        <Button
            onPress={props.onPress}>
            <Icon type="feather" 
                  name="check"
                  color="#F7C59F"
                  size={35}
                  style={{opacity:(props.active)?100:0}}
                />
            <Text> {props.name} </Text>
        </Button>
    )
}

export default ModeListItem;