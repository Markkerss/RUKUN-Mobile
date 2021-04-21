import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import {useFonts,Poppins_700Bold,Poppins_600SemiBold,Poppins_500Medium} from '@expo-google-fonts/poppins';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux'

const ListItemTransaction = (props)=>{
    const iconSet = (category) => {
        if (category === "expance") {
            return <Icon name="cart-remove" style={{...styles.icon, backgroundColor:"#e74c3c"}}></Icon>
        }else if (category === "Iuran Sampah") {
            return <Icon name="trash-can-outline"  style={{...styles.icon}}></Icon>
        }else if (category === "Iuran Keamanan") {
            return <Icon name="security" style={styles.icon}></Icon>
        }else if (category === "Iuran Kas") {
            return <Icon name="credit-card-multiple-outline" style={{...styles.icon}}></Icon>
        }else{
            return <Icon name="cash-register" style={{...styles.icon}}></Icon>
        }
    }
    return (
        <View style={styles.list}>
            <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between", padding:5, width:"100%"}}>
                <View style={{flexDirection:"row", alignItems:"center", padding:5, paddingLeft:0, flex:3}}>
                    {iconSet(props.transaction.item.type === "income" ? props.transaction.item.category : props.transaction.item.type)}
                    <View style={{flex:1}}>
                        <Text style={{fontFamily:"Poppins_600SemiBold", fontSize: 17}}>{ props?.transaction.item.title }</Text>
                        <Text style={{fontFamily:"Poppins_500Medium", marginTop:-5}}>By { props.transaction.item.User.role === "admin" ? props.transaction.item.User.role: props.transaction.item.User.name }</Text>
                    </View>
                </View>
                <Text style={{fontFamily:"Poppins_500Medium"}}>Rp { props.transaction.item.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") }</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    list : {
        flexDirection: "row",
        backgroundColor: "white",
        padding: 10,
        marginTop:10,
        borderRadius: 10,
        alignItems:"center"
    },
    icon:{
        fontSize:30, 
        padding:8, 
        marginRight: 14, 
        color:"white",  
        backgroundColor: "#3C5CAC",
        borderRadius:10
    }
})
export default ListItemTransaction