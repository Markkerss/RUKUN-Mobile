import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Avatar, Button } from 'react-native-paper';
import {useFonts,Poppins_700Bold,Poppins_600SemiBold,Poppins_500Medium} from '@expo-google-fonts/poppins';
import Icon from 'react-native-vector-icons/FontAwesome';
import ListItemTransaction from '../components/listItemTransaction';
import { IconButton } from 'react-native-paper';
import firebase from '../firebase'
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Chat = ({route,navigate}) =>{
    const [message, setMessage] = useState("")
    const [chat, setChat] = useState([])
    const [user, setUser] = useState({})

    let [fontsLoaded] = useFonts({Poppins_700Bold,Poppins_600SemiBold,Poppins_500Medium})
    const db = firebase.firestore().collection("chat").doc("desa"+user.VillageId).collection("message")
    
    
    const handleSubmit = () =>{
        console.log("mashok");
        console.log(user);
        db.add({
            message,
            timestamp : firebase.firestore.FieldValue.serverTimestamp(),
            userId : user.id,
            userName : user.name
        })
    }

    useEffect(() => {
        async function getUser() {
            const userString = await AsyncStorage.getItem('user')
            setUser(JSON.parse(userString))
        }
        getUser()
    }, [user])

    useEffect(() => {
        db.onSnapshot((querySnapshot) => {
                var messages = [];
                querySnapshot.forEach((doc) => {
                    messages.push(doc.data());
                });
                setChat(messages)
            });
    }, [])



    if (!fontsLoaded) {
        return <Text>loading</Text>;
    }
    return(
        <>
        <View style={styles.container}>
            <View>
                {chat.map(item=>(
                    item.userId == user.id ? (
                        <View style={{justifyContent:"flex-end", flexDirection:'row', marginTop:25}}>
                            <Text style={styles.bubbleMessageMe}>{item.message}</Text>
                        </View>
                    ) : (
                        <View>
                            <Text style={{marginLeft: 5, marginBottom:5}}>Fadho</Text>
                            <Text style={styles.bubbleMessage}>{item.message}</Text>
                        </View>
                    )
                ))}
                
                
      
            </View>
            <View style={styles.chatContainer}>
                <TextInput style={styles.boxChat} value={message} onChangeText={setMessage}></TextInput>
                <IconButton onPress={handleSubmit} icon="send"/>
            </View>
            
        </View>
        
        </>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 20,
      paddingHorizontal: 10,
      backgroundColor: '#ecf0f1',
    },
    chatContainer:{
        width:"100%",
        flexGrow:1,
        position:"absolute",
        bottom: 5,
        flexDirection: "row",
        height: 50,
        backgroundColor: "#bdc3c7",
        borderRadius: 30,
        marginHorizontal:10,
    },
    boxChat:{
        flexGrow: 1,
        paddingLeft:10,
        borderColor: "white",
        margin: 3,
        
    },
    bubbleMessage:{
        alignSelf:'baseline',
        borderRadius: 15,
        flexDirection: "row",
        backgroundColor: "#bdc3c7",
        padding: 8,
    },
    bubbleMessageMe:{
        alignSelf:'baseline',
        justifyContent : 'flex-end',
        borderRadius: 15,
        flexDirection: "row",
        backgroundColor: "#bdc3c7",
        padding: 10,
        maxWidth: 250
    },
    
});

export default Chat