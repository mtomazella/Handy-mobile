import React, { useState } from 'react'
import { Alert } from 'react-native'

import MaskedInput from './components/MaskedInput'
import { Main,
         MessageView,
         MessageText,
         InputView,
         SectionHeader } from './style'
import { Icon, Button } from 'react-native-elements'

import config from './../../components/Config'
import db from './../../components/Database/DatabaseManager'

const ConfigScreen = ({ navigation }) => {
    const [ finger,     setFinger   ] = useState( "" );
    const [ mode,       setMode     ] = useState( "" );
    const [ device,     setDevice   ] = useState( "" );
    const [ sFull,      setSfull    ] = useState( "" );
    const [ sCommand,   setScommand ] = useState( "" );
    const [ cFull,      setCfull    ] = useState( "" );
    const [ cMode,      setCmode    ] = useState( "" );
    const [ cState,     setCstate   ] = useState( "" );
    
    const [forceUpdateValue, setForceUpdate] = useState(0);
    function forceUpdate(){ setForceUpdate(forceUpdateValue + 1); }

    const fingerLabel   = "Número de Atuadores";
    const modeLabel     = "Número de Modos Simultâneos";
    const deviceLabel   = "UUID Prótese"; 
    const sFullLabel    = "UUID Serviço Estado Geral";  
    const sCommandLabel = "UUID Serviço Comando";
    const cFullLabel    = "UUID Característica Estado Geral";  
    const cModeLabel    = "UUID Característica Modo";  
    const cStateLabel   = "UUID Característica Estado";

    function createUpdateObj () {
        const defaultMask = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx";
        const keys = ["FINGER_COUNT","MODE_COUNT","DEVICE_UUID","FULLSTATE_SERVICE_UUID",
            "GETTER_SERVICE_UUID","FULLSTATE_CHAR_UUID","MODE_CHAR_UUID","STATE_CHAR_UUID"];
        const values = [
            {label:fingerLabel,     value:finger,   set:setFinger                               },
            {label:modeLabel,       value:mode,     set:setMode                                 },
            {label:deviceLabel,     value:device,   set:setDevice,      mask:"xx:xx:xx:xx:xx:xx"},
            {label:sFullLabel,      value:sFull,    set:setSfull,       mask:defaultMask        },
            {label:sCommandLabel,   value:sCommand, set:setScommand,    mask:defaultMask        },
            {label:cFullLabel,      value:cFull,    set:setCfull,       mask:defaultMask        },
            {label:cModeLabel,      value:cMode,    set:setCmode,       mask:defaultMask        },
            {label:cStateLabel,     value:cState,   set:setCstate,      mask:defaultMask        }
        ]
        const updateObj = {};

        for ( i = 0; i < keys.length; i++ )
            if ( values[i].value != "" ) updateObj[keys[i]] = values[i];
        return updateObj;
    }

    function treat ( label, mask ) {
        Alert.alert( 
            "Erro",
            `O valor da propriedade "${label}" deve seguir o padrão ${mask} para ser válido.`
        )
    }

    function verifyAndTreatValue ( obj ) {
        if ( !obj.mask ) { obj.set(""); return true; }
        if ( obj.value.length != obj.mask.length ) { treat( obj.label, obj.mask ); return false; }
        for ( i = 0; i < obj.value.length; i++ )
            if ( obj.mask[i] != 'x' && obj.value[i] != obj.mask[i] ) { 
                treat( obj.label, obj.mask );
                return false; 
            }
        obj.set("");
        return true;
    }

    function saveConfig () {
        const updateObj = createUpdateObj();
        let result = true;
        Object.keys( updateObj ).forEach( key => {
            if ( !verifyAndTreatValue( updateObj[key] ) ) { result = false; return }
                db.saveConfig( key, updateObj[key].value )
                .then( () => { setTimeout( () => { forceUpdate() }, 500 ) } )
        } )
        return result;
    }

    return (
        <Main contentContainerStyle={{alignItems:"center"}}>
            <MessageView>
                <Icon 
                    type="feather"
                    name="alert-octagon"
                    color="#fefefe"
                    size={45}
                    containerStyle={{
                        paddingBottom:10
                    }}
                />
                <MessageText style={{marginBottom:5}}> Mudar as configurações de forma inapropriada causará o mal funcionamento da prótese/app. </MessageText>
                <MessageText> Consulte o Manual De Construção no site para enteder como fazer sua configuração. </MessageText>
            </MessageView>

            <InputView>

                <SectionHeader> Funcionamento </SectionHeader>

                <MaskedInput 
                    label={fingerLabel}
                    placeholder={String( config.FINGER_COUNT )}
                    noMask={true}
                    value={finger}
                    setValue={setFinger}
                />
                <MaskedInput 
                    label={modeLabel}
                    placeholder={String( config.MODE_COUNT )}
                    noMask={true}
                    value={mode}
                    setValue={setMode}
                />

                <SectionHeader> UUIDs </SectionHeader>

                <MaskedInput 
                    label={deviceLabel}
                    placeholder={config.DEVICE_UUID}
                    value={device}
                    mask="xx:xx:xx:xx:xx:xx"
                    setValue={setDevice}
                />
                <MaskedInput 
                    label={sFullLabel}
                    placeholder={config.FULLSTATE_SERVICE_UUID}
                    value={sFull}
                    setValue={setSfull}
                />
                <MaskedInput 
                    label={cFullLabel}
                    placeholder={config.FULLSTATE_CHAR_UUID}
                    value={cFull}
                    setValue={setCfull}
                />
                <MaskedInput 
                    label={sCommandLabel}
                    placeholder={config.GETTER_SERVICE_UUID}
                    value={sCommand}
                    setValue={setScommand}
                />
                <MaskedInput 
                    label={cModeLabel}
                    placeholder={config.MODE_CHAR_UUID}
                    value={cMode}
                    setValue={setCmode}
                />
                <MaskedInput 
                    label={cStateLabel}
                    placeholder={config.STATE_CHAR_UUID}
                    value={cState}
                    setValue={setCstate}
                />
            </InputView>

            <Button 
                title="SALVAR"
                type="outline"
                containerStyle={{
                    display: 'flex',
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    padding:20,
                    marginBottom:20
                }}
                buttonStyle={{
                    borderColor: 'red',
                    padding:15,
                    width:"100%"
                }}
                titleStyle={{
                    color: "#ff6961",
                    fontSize: 20,
                    letterSpacing: 8
                }}
                onPress={ () => {
                    if ( saveConfig() ){
                        config.reinit();
                        navigation.navigate( "Home" )
                    }
                } }
            />
        </Main>
    )
}

export default ConfigScreen;