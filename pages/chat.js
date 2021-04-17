import React, { useEffect, useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Avatar, Button } from 'react-native-paper';
import {useFonts,Poppins_700Bold,Poppins_600SemiBold,Poppins_500Medium} from '@expo-google-fonts/poppins';
import Icon from 'react-native-vector-icons/FontAwesome';
import ListItemTransaction from '../components/listItemTransaction';
import { IconButton } from 'react-native-paper';

const Chat = ({route,navigate}) =>{
    const [message, setMessage] = useState("")
    let [fontsLoaded] = useFonts({Poppins_700Bold,Poppins_600SemiBold,Poppins_500Medium})
    if (!fontsLoaded) {
        return <Text>loading</Text>;
    }
    return(
        <>
        <View style={styles.container}>
            <View>
                <View style={styles.bubbleMessage}>
                    <Text>WKKWKWKW ada ada ae dah lu WKWKWKKW</Text>
                </View>
                <View style={{justifyContent:"flex-end", flexDirection:'row', marginTop:25}}>
                    <Text style={styles.bubbleMessageMe}>WKKWKWKW ada ada ae dah lu WKWKWKKW</Text>

                </View>
      
            </View>
            <View style={styles.chatContainer}>
                <TextInput style={styles.boxChat} value={message} onChangeText={setMessage}></TextInput>
                <IconButton icon="send"/>
            </View>
            
        </View>
        
        </>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 40,
      paddingHorizontal: 10,
      backgroundColor: '#ecf0f1',
    },
    chatContainer:{
        width:"100%",
        flexGrow:1,
        position:"absolute",
        bottom: 0,
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
    logo:{
        width: 120,
        height: 50
    },
    header:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    card:{
        marginTop: 10,
        backgroundColor: "red",
        width : "100%",
        height : 200,
        borderRadius: 20,
        padding: 10
    },
    desaName:{
        fontFamily:'Poppins_700Bold',
        fontSize: 25,
        color: "white",
    },
    judulSaldo:{
        fontFamily:'Poppins_600SemiBold',
        fontSize: 20,
        color: "white",
        paddingLeft: 6,
        marginBottom: -8,
    },
    saldo:{
        fontFamily:'Poppins_600SemiBold',
        fontSize: 30,
        color: "white",
    },
    ilustrasi :{
        position: "absolute",
        bottom: 25,
        right :20,
        width: 120,
        height: 100,
        opacity: 0.5
    },
    buttonContainer : {
        flexDirection: "row",
        marginTop: 10
    }
    
});

export default Chat