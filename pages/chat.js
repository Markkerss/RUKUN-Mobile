import React, { useEffect, useState, useRef } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
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
    const [loading, setLoading] = useState(false)
    const flatlist = useRef()

    let [fontsLoaded] = useFonts({Poppins_700Bold,Poppins_600SemiBold,Poppins_500Medium})
    const db = firebase.firestore().collection("chat").doc("desa"+user.VillageId).collection("message")
    
    const handleSubmit = () =>{
        console.log("mashok");
        console.log(user);
        try {
            db.add({
                timestamp : firebase.firestore.FieldValue.serverTimestamp(),
                message,
                userId : user.id,
                userName : user.name
            })
            setMessage("")
        } catch (error) {
            console.log(error);
        }

    }
    async function getUser() {
        setLoading(true)
        const userString = await AsyncStorage.getItem('user')
        const userJSON = JSON.parse(userString)
        setUser(userJSON)
        try {
            firebase.firestore().collection("chat").doc("desa"+userJSON.VillageId).collection("message").orderBy("timestamp", 'asc').onSnapshot((querySnapshot) => {
                var messages = [];
                querySnapshot.forEach((doc) => {
                    messages.push(doc.data());
                });
                setLoading(false)
                setChat(messages)
            });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    // useEffect(() => {
    //     console.log(user,"masuk pertama kali");
        
        
    // },[])

    const getData = () =>{
        setLoading(true)
        db.orderBy("timestamp", 'asc').onSnapshot((querySnapshot) => {
                var messages = [];
                querySnapshot.forEach((doc) => {
                    messages.push(doc.data());
                });
                setLoading(false)
                setChat(messages)
            });
    }

    if (!fontsLoaded) {
        return <Text>loading</Text>;
    }
    let emptyChat = []
    return(
        <>
        <View style={styles.container}>
            <View style={{flex:1, marginBottom:80}}>
            <FlatList
                ref={ref => flatList = ref}
                onContentSizeChange={() => flatList.scrollToEnd({animated: true})}
                onLayout={() => flatList.scrollToEnd({animated: true})}
                data={chat}
                renderItem={(item, index)=>(<Bubble emptyChat={emptyChat} index={index} chat={chat} item={item.item} user={user}/>)}
                keyExtractor={(item,index) => index.toString()}
                refreshing={loading}
                onRefresh={()=>{getData()}}
                showsVerticalScrollIndicator={true}
                showsHorizontalScrollIndicator={false}
            />
            </View>
            <View style={styles.chatContainer}>
                <TextInput style={styles.boxChat} value={message} onChangeText={setMessage}></TextInput>
                <IconButton onPress={handleSubmit} icon="send"/>
            </View>
            
        </View>
        
        </>
    )
}
const Bubble = ({item,user,index,emptyChat})=>{
    emptyChat.push(item)
    let seconds = null
    if (item.timestamp !== null) {
        seconds = (item.timestamp.seconds + Number((new Date().getTimezoneOffset()) * -60)) * 1000
    } else {
        seconds = (Number(Date.now()/1000)+ Number((new Date().getTimezoneOffset()) * -60)) * 1000 
    }
    return(
        item.userId == user.id ? (
            <View style={{justifyContent:"flex-end", flexDirection:'row', marginTop:10}}>
                <Text style={{marginRight: 5, marginTop:18}}>{new Date(seconds).toISOString().substr(11, 5)}</Text>
                <Text style={styles.bubbleMessageMe}>{item.message}</Text>
            </View>
        ) : (
            emptyChat.length !== 1 && (emptyChat[emptyChat.length - 1].userName === emptyChat[emptyChat.length - 2].userName) ? (
            <View>
                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.bubbleMessage}>{item.message}</Text>
                    <Text style={{marginLeft: 5, marginTop:18}}>{new Date(seconds).toISOString().substr(11, 5)}</Text>
                </View>
            </View>
            ) : (
                <View>
                    <Text style={{marginLeft: 5, marginTop:13}}>{ item.userName }</Text>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.bubbleMessage}>{item.message}</Text>
                        <Text style={{marginLeft: 5, marginTop:18}}>{new Date(seconds).toISOString().substr(11, 5)}</Text>
                    </View>
                </View>
            )
        )
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
        bottom: 10,
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
        marginTop: 4
    },
    bubbleMessageMe:{
        alignSelf:'baseline',
        justifyContent : 'flex-end',
        borderRadius: 15,
        flexDirection: "row",
        backgroundColor: "rgba(41, 128, 185,0.4)",
        padding: 10,
        maxWidth: 250,
    },
    
});

export default Chat