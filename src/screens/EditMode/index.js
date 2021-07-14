import React, 
       { useEffect, useState } from 'react';
import { View }                from 'react-native'
import { Button }              from 'react-native-elements'
import { Icon }                from 'react-native-elements/dist/icons/Icon';

import DialogInput         from './Dialog/Input'
import DialogDelete        from './Dialog/Delete'
import Mode                from './../../components/HandControl/Mode'
import InputWithEditButton from './InputWithEditButton'
import ConfigItem          from './ConfigItem'
import { Main, 
         TabButtonView, 
         ConfigView,
         ConfigLabelsView,
         ConfigLabelContainer,
         ConfigLabel }     from './style'

import db from './../../components/Database/DatabaseManager'

const EditMode = ({ navigation, route }) => {
    const id = route.params.id|undefined;

    const [ tab1, setTab ]          = useState( true );
    const [ mode, setMode ]         = useState( new Mode() );
    const [ dialogVisible, 
            setDialogVisible ]      = useState( false )
    const [ deleteDialogVisibility, 
            setDeleteDialogVis ]    = useState( false );

    useEffect( () => {
        route.params.update = false;
        if ( id )
            db.fetchModeById( id )
            .then( mode => {
                setMode(mode);
            } )
            .catch( console.error )
        else setMode( new Mode().initFromObject( getDefaultMode() ) );
    }, [ id, route.params.update, route.params.id ] )

    const [ dialogInfo, setDialogInfo ] = useState({
        state: undefined,
        finger: undefined,
        property: ""
    });
    function dialogSave ( value ) {
        mode.states[(dialogInfo.state)?"closed":"open"][dialogInfo.finger][dialogInfo.property] = value;
    }

    function setName ( string ) {
        mode.name = string;
    }

    function deleteMode ( ) {
        db.deleteMode( mode.id );
        navigation.navigate( "Modes", { update: true } );
    }

    return (
        <Main>
            <DialogInput visible={dialogVisible} icon={dialogInfo.property} setVisible={setDialogVisible} save={dialogSave}/>
            <DialogDelete visible={deleteDialogVisibility} setVisible={setDeleteDialogVis} delete={deleteMode}/>

            <InputWithEditButton name={mode.name} setName={setName}/>
            <TabButtonView style={{borderBottomColor:"#cccccc", borderBottomWidth:1}}>
                <TabButton 
                    iconName="toggle-left"
                    title="Desativado"
                    onPress={ ()=>{setTab(true)} }
                    isActive={ ()=>{return tab1} }
                />
                <TabButton 
                    iconName="toggle-right"
                    title="Ativado"
                    onPress={ ()=>{setTab(false)} }
                    isActive={ ()=>{return !tab1} }
                />
            </TabButtonView>


            <View
                style={{ display:(tab1)?"flex":"none", height:"73%", paddingBottom:30 }}
            >
                <ConfigView>
                    <Labels/>

                    {
                        mode.states.open.map( ( state, fingerIndex ) => (
                            <ConfigItem
                                key={fingerIndex}
                                number={fingerIndex+1}
                                angle={state.angle}
                                start={state.start}
                                duration={state.duration}
                                state={false}
                                mode={mode}
                                openDialog={()=>{setDialogVisible(true)}}
                                setDialogInfo={setDialogInfo}
                            />
                        ) )
                    }
                </ConfigView>
            </View>

            <View
                style={{ display:(!tab1)?"flex":"none", height:"73%", paddingBottom:30 }}
            >
                <ConfigView>
                    <Labels/>
                    
                    {
                        mode.states.closed.map( ( state, fingerIndex ) => (
                            <ConfigItem
                                key={fingerIndex}
                                number={fingerIndex+1}
                                angle={state.angle}
                                start={state.start}
                                duration={state.duration}
                                state={true}
                                mode={mode}
                                openDialog={()=>{setDialogVisible(true)}}
                                setDialogInfo={setDialogInfo}
                            />
                        ) )
                    }
                </ConfigView>
            </View>

            <View style={{display:"flex",flexDirection:"row",justifyContent:"space-around"}}>
                <Button 
                    title="Salvar"
                    icon={
                        <Icon 
                            type="feather"
                            name="save"
                            size={25}
                            color="#fefefe"
                            containerStyle={{
                                paddingRight: 10
                            }}
                        />
                    }
                    type="solid"
                    buttonStyle={{backgroundColor:"#F7C59F"}}
                    titleStyle={{fontSize:20, color:"#fefefe"}}
                    containerStyle={{
                        paddingLeft:30, paddingRight:(id)?10:30,
                        width:(id)?"80%":"100%"
                    }}
                    onPress={() => {
                        db.addMode( mode );
                        navigation.navigate( "Modes", { update: true } );
                    }}
                />
                <Button 
                    icon={
                        <Icon 
                            type="feather"
                            name="trash-2"
                            size={25}
                            color="red"
                            containerStyle={{
                                paddingRight: 3,
                                paddingLeft: 3
                            }}
                        />
                    }
                    titleStyle={{color:"red"}}
                    type="outline"
                    buttonStyle={{borderColor:"red"}}
                    containerStyle={{display:(id)?"flex":"none",paddingRight:30}}
                    onPress={() => {
                        setDeleteDialogVis(true);
                    }}
                />
            </View>
        </Main>
    );
}

export default EditMode

/* ----------------- */

const Labels = props => {
    return (
        <ConfigLabelsView>
            <ConfigLabelContainer style={{width:"15%"}}>
                <ConfigLabel> Número </ConfigLabel>
            </ConfigLabelContainer>
            <ConfigLabelContainer>
                <ConfigLabel> Ângulo </ConfigLabel>
            </ConfigLabelContainer>
            <ConfigLabelContainer>
                <ConfigLabel> Início (ms) </ConfigLabel>
            </ConfigLabelContainer>
            <ConfigLabelContainer>
                <ConfigLabel> Duração (ms) </ConfigLabel>
            </ConfigLabelContainer>
        </ConfigLabelsView>
    )
}

const TabButton = props => {
    return (
        <Button 
            icon={
                <Icon 
                    type="feather"
                    name={ props.iconName }
                    color="#888888"
                    containerStyle={{
                        paddingRight:10
                    }}
                />
            }
            title={props.title}
            titleStyle={{
                color:"#888888"
            }}
            buttonStyle={{
                width:"95%",
                padding:10
            }}
            type="clear"
            onPress={ props.onPress }
        />
    )
}

function genState ( angle ) {
    return {
        angle: angle,
        start: 0,
        duration: 0
    }
}

function getDefaultMode ( ) {
    const obj = {
        id: undefined,
        name: "Novo Modo",
        states: {
            open: [ ],
            closed: [ ]
        },
        active: false
    }
    for ( i = 0; i < 5; i++ ) {
        obj.states.open[i] = genState(0);
        obj.states.closed[i] = genState(180);
    }
    return obj;
} 