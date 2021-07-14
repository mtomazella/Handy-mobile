import React from 'react';
import { View } from 'react-native';
import { Button, Icon } from 'react-native-elements';

const MenuButton = props => {
    return (
        <View style={{
            position:"absolute",
            left:0,
            top:props.top,
        }}>
            <Button 
                type="clear"
                icon={
                    <Icon 
                    type="feather"
                    name="chevron-right"
                    color="#000000"
                    />
                }
                titleStyle={{color:"#ffffff"}}
                buttonStyle={{
                    backgroundColor:"#E7E7E7",
                    borderTopRightRadius:20,
                    borderBottomRightRadius:20
                }}
                onPress={()=>{props.navigation.openDrawer()}}
            />
        </View>
    );
}

export default MenuButton;