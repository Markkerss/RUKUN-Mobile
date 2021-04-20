import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, ScrollView, StyleSheet, Text, View, KeyboardAvoidingView, Pressable, FlatList } from 'react-native';
import { TextInput, Menu, Button, Provider, Modal, Portal, IconButton, Surface, Chip, FAB  } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Avatar } from 'react-native-paper';
import {useFonts,Poppins_700Bold,Poppins_600SemiBold,Poppins_500Medium} from '@expo-google-fonts/poppins';
import background from '../assets/background.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { setSuggestionsAsync } from '../store/actions/suggestions';

const Suggestion = ({route,navigation}) =>{
    const dispatch = useDispatch()
    const {suggestions,loading,error} = useSelector(state => state.suggestionsReducer)

    useEffect(() => {
        dispatch(setSuggestionsAsync())
    }, [])

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
                    <IconButton onPress={()=>{navigation.goBack()}} icon="chevron-left" color="white" size={40} style={{position:"absolute", left:0, top:26}}></IconButton>
                    <Image source={require('../assets/logoWhite.png')} style={styles.logo}></Image>
                </View>
                
                <View style={styles.content}>
                    <Text style={styles.judul}>Information</Text>
                    <FlatList
                        data={suggestions}
                        renderItem={(item)=>(<Tile data={item.item}/>)}
                        keyExtractor={(item,index) => index.toString()}
                        refreshing={loading}
                        onRefresh={()=>{dispatch(setSuggestionsAsync())}}
                        style={{margin:-8}}
                    />
                </View>
            </ImageBackground>
            </Provider>
        </View>
        <FAB
            style={styles.fab}
            icon="plus"
            onPress={() => {navigation.navigate("AddSuggestion")}}
        />
        </>
    )
}

const Tile = ({data}) =>{
    return(
        <Surface style={styles.card}>
            <Text style={styles.judulSection}>{data?.title}</Text>
            <Text style={styles.paragraph}>{data?.description}</Text>
            <View style={{flexDirection:"row", marginTop:10}}>
                <Chip icon="information" style={styles.information}>Information</Chip>
            </View>
        </Surface>
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
        height:600,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    background: {
        width: "100%",
        position:"absolute",
        resizeMode: "cover",
        alignItems: 'center'
    },
    logo:{
        width: 120,
        height: 50
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
    amount:{
        marginTop: 20,
        marginBottom:50,
        flexDirection:"row",
        
    },
    card:{
        marginTop: 10,
        elevation:9,
        margin:8,
        borderRadius: 20,
        padding: 10
    },
    judul:{
        fontFamily:'Poppins_700Bold',
        fontSize: 30,
        color: "#867FEE",
    },
    judulSection:{
        fontFamily:'Poppins_600SemiBold',
        fontSize: 20
    },
    paragraph:{
        fontFamily:'Poppins_500Medium',
        fontSize: 14
    },
    information: {
        margin:2, 
        backgroundColor:"rgba(241, 196, 15,0.4)", 
        color: "rgba(243, 156, 18,1.0)"
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },


    
});

export default Suggestion