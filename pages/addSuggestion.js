import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, ScrollView, StyleSheet, Text, View, KeyboardAvoidingView, Pressable } from 'react-native';
import { TextInput, Menu, Button, Provider, Modal, Portal, IconButton, Surface, Chip, FAB  } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Avatar } from 'react-native-paper';
import {useFonts,Poppins_700Bold,Poppins_600SemiBold,Poppins_500Medium} from '@expo-google-fonts/poppins';
import background from '../assets/background.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch } from 'react-redux';
import { createSuggestionsAsync } from '../store/actions/suggestions';

const AddSuggestion = ({route,navigation}) =>{
    const dispatch = useDispatch()
    //state data
    const [title, setTitle] = useState('')
    const [category, setCategory] = useState()
    const [description, setDescription] = useState('')
    
    //dropdown Setting
    const [visible, setVisible] = React.useState(false);
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    //End dropdown Setting

    const handleSubmit = () =>{
        const data = {
            title,
            type : category,
            description
        }
        dispatch(createSuggestionsAsync(data))
    }


    let [fontsLoaded] = useFonts({Poppins_700Bold,Poppins_600SemiBold,Poppins_500Medium})
    if (!fontsLoaded) {
        return <Text>loading</Text>;
    }
    return(
        <>
        <View style={styles.container}>
            <Provider>
            <ImageBackground source={background} style={styles.background}>
                <View style={styles.header}>
                    <IconButton onPress={()=>{navigation.goBack()}} icon="chevron-left" color="white" size={40} style={{position:"absolute", left:3, top:35}}></IconButton>
                    <Image source={require('../assets/logoWhite.png')} style={styles.logo}></Image>
                </View>
                
                <View style={styles.content}>
                    <Text style={styles.judul}>Add Information</Text>
                    <TextInput
                        label="Titile"
                        autoFocus
                        mode = "outlined"
                        value={title}
                        onChangeText={setTitle}
                        style={{backgroundColor:"white"}}
                        left={<TextInput.Icon name="format-title"/>}
                    />
                    <Pressable onPress={showModal} style={{marginTop:15, marginBottom: 15}}>
                        <TextInput
                            label="Category"
                            mode = "outlined"
                            value={category}
                            editable={false}
                            onFocus={showModal}
                            style={{backgroundColor:"white", }}
                            left={<TextInput.Icon name="cash-register"/>}
                        />
                    </Pressable>
                    <TextInput
                        label="Description"
                        mode = "outlined"
                        value={description}
                        multiline
                        numberOfLines={4}
                        onChangeText={setDescription}
                        style={{backgroundColor:"white"}}
                        left={<TextInput.Icon name="format-title"/>}
                    />
                    
                </View>
            </ImageBackground>
            
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={{margin:60, backgroundColor:"white", justifyContent:"center", padding:10, borderRadius:10}}>
                    <Menu.Item icon="information" onPress={() => {setCategory("information"); hideModal()}} title="Information" />
                    <Menu.Item icon="shield" onPress={() => {setCategory("suggestion"); hideModal()}} title="Suggestion" />
                    <Menu.Item icon="exclamation-thick" onPress={() => {{setCategory("alert"); hideModal()}}} title="Alert" />
                    <Menu.Item icon="close" onPress={() => {hideModal()}} title="Close" />
                </Modal>
            </Portal>
            </Provider>
        </View>
        <View>
            <Button mode="contained" onPress={()=>{handleSubmit()}} style={{borderRadius:0, paddingVertical:6, backgroundColor: '#3c5cac'}}>Submit</Button>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      
      backgroundColor: '#ecf0f1',
    },
    content:{
        position:"relative",
        padding: 20,
        backgroundColor:"white", 
        width: "100%", 
        height:800,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: 10,
    },
    background: {
        width: "100%",
        position:"absolute",
        resizeMode: "cover",
        alignItems: 'center'
    },
    logo:{
        width: 160,
        height: 60
    },
    header:{
        width:"100%",
        flexDirection: "row",
        paddingTop: 40,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom:10,
        paddingHorizontal: 10,
    },
    card:{
        marginTop: 10,
        elevation:9,
        borderRadius: 20,
        padding: 10,
        marginBottom: 5,
    },
    judul:{
        fontFamily:'Poppins_700Bold',
        fontSize: 30,
        color: "#3c5cac",
        textAlign: "center",
        marginBottom: 15,
        marginTop: 10
    }


    
});

export default AddSuggestion