import React, { useEffect, useState } from 'react';

import { View }         from 'react-native';
import { Icon, Button } from 'react-native-elements'

import MenuButton   from './../../components/MenuButton'
import Toast        from './../../components/Alert'
import db           from './../../components/Database/DatabaseManager';
import handControl  from './../../components/HandControl/HandControl'
import config       from './../../components/Config'

import ModeList from './components/ModeList';
import ModeListItem from './components/ModeListItem'
import { TitleView, 
         Title,
         ButtonsView,
         Main } from './style';

const Modes = ({ navigation, route }) => {
    const [ modes, setModes ] = useState( [] );
    const [ editingActives, setEditing ] = useState( false );
    const [forceUpdateValue, setForceUpdate] = useState(0);
    const [ changedModes, setChanged ] = useState([]);

    function forceUpdate(){
        setForceUpdate(forceUpdateValue + 1);
    }

    function fetch ( ) {
        db.fetchModes()
        .then( dbModes => { setModes( dbModes ); /*console.log(dbModes)*/ } )
    }

    function canSelectMoreModes ( ) {
        return modes.filter( mode => ( mode.active == 1 ) ).length < config.MODE_COUNT;
    }

    useEffect( () => {
        fetch()
    }, [ ] )

    if ( route && route.params && route.params.update ) { fetch(); route.params.update = false }

    return (
        <Main>
            <MenuButton navigation={navigation} top={80}/>
            <TitleView>
                <Icon type="antdesign" 
                      name="setting" 
                      size={40} 
                      color="#F7C59F"/>
                <Title> Modos </Title>
            </TitleView>
            <View style={{
                height:"70%"
            }}>
                <ModeList fadingEdgeLength={20}>
                    {
                        modes.map( ( data, index ) => (
                            <ModeListItem
                                name={data.name}
                                id={data.id}
                                key={index}
                                active={(data.active==1)?true:false}
                                mode={data}
                                onPress={()=>{
                                    if ( !editingActives ) 
                                        navigation.navigate("Edit", { id: data.id, update: true })
                                    else {
                                        if ( canSelectMoreModes() || data.active ) {
                                            modes[index].active = (!data.active)?1:0;
                                            if ( changedModes.indexOf( modes[index] ) == -1 )
                                                changedModes.push(modes[index]);
                                            forceUpdate();
                                        } else {
                                            new Toast( "O número máximo de modos foi atingido." );
                                        }
                                    }
                                }}
                            />
                        ) )
                    }
                </ModeList>
            </View>
            <ButtonsView style={{display:(!editingActives)?"flex":"none"}}>
                <Button title="Ativos" 
                        icon={
                            <Icon type="feather"
                                  name="edit-3"
                                  color="#fefefe"
                                  containerStyle={{paddingRight:10}}
                                  size={20}
                            />
                        }
                        buttonStyle={{
                            width:"90%",
                            backgroundColor:"#F7C59F"
                        }}
                        onPress={ () => { setEditing( true ) } } />
                <Button title="+" 
                        buttonStyle={{
                            width:"90%",
                            borderColor:"#999999"
                        }}
                        titleStyle={{
                            color:"#F7C59F"
                        }}
                        type="outline"
                        onPress={ () => { navigation.navigate("Add", {id:undefined,update:true}) } } />
            </ButtonsView>
            <ButtonsView style={{display:(editingActives)?"flex":"none"}}>
                <Button title="Salvar" 
                        buttonStyle={{
                            width:"90%",
                            backgroundColor:"#F7C59F"
                        }}
                        onPress={ () => {
                            setEditing(false);
                            changedModes.forEach( mode => {
                                db.addMode(mode);
                            } )
                            handControl.fetchAndWriteModes();
                            setChanged( [] );
                        } } />
                <Button title="Cancelar" 
                        buttonStyle={{
                            width:"89%",
                            borderColor:"#999999"
                        }}
                        titleStyle={{
                            color:"#F7C59F"
                        }}
                        type="outline"
                        onPress={ () => { setEditing( false ) } } />
            </ButtonsView>
        </Main>
    )
}

export default Modes;