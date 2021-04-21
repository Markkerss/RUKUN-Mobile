import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { FlatList, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Avatar, Button } from 'react-native-paper';
import {useFonts,Poppins_700Bold,Poppins_600SemiBold,Poppins_500Medium} from '@expo-google-fonts/poppins';
import Icon from 'react-native-vector-icons/FontAwesome';
import ListItemTransaction from '../components/listItemTransaction';
import { setTransactionsAsync } from '../store/actions/transactions';

const MyTransaction = ({route,navigation}) =>{
    const [fontsLoaded] = useFonts({Poppins_700Bold,Poppins_600SemiBold,Poppins_500Medium})
    const dispatch = useDispatch()
    const { transactions, loading } = useSelector(state => state.transactionsReducer)

    useEffect(() => {
        dispatch(setTransactionsAsync())
    }, [dispatch])

    if (!fontsLoaded) {
        return <Text>loading</Text>;
    }

    const renderItem = ( transaction ) => (
        // console.log(transaction)
        <ListItemTransaction transaction={transaction}/>
    );
    
    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../assets/logoBlue.png')} style={styles.logo}></Image>
            </View>
            <View style={{marginTop:15, height:730}}>
                <Text style={{...styles.desaName, color:"#3c5cac"}}>Village Transactions</Text>
                <FlatList
                    data={transactions}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    refreshing={loading}
                    onRefresh={()=>{dispatch(setTransactionsAsync())}}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 40,
      paddingHorizontal: 10,
      backgroundColor: '#ecf0f1',
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

export default MyTransaction