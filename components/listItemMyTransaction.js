import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Avatar, Button } from 'react-native-paper';
import {useFonts,Poppins_700Bold,Poppins_600SemiBold,Poppins_500Medium} from '@expo-google-fonts/poppins';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch } from 'react-redux'

const ListItemMyTransaction = (props)=>{
    const iconSet = (category) => {
        if (category === "Iuran Sampah") {
            return <Icon name="trash-can-outline"  style={{...styles.icon}}></Icon>
        }else if (category === "Iuran Keamanan") {
            return <Icon name="security" style={styles.icon}></Icon>
        }else if (category === "Iuran Kas") {
            return <Icon name="credit-card-multiple-outline" style={{...styles.icon}}></Icon>
        }else{
            return <Icon name="cash-register" style={{...styles.icon}}></Icon>
        }
    }

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    return (
        <View style={styles.list}>
            <View style={{flexDirection:"row", alignItems:"center", justifyContent:"space-between", padding:5, width:"100%"}}>
                <View style={{flexDirection:"row", alignItems:"center", padding:5, paddingLeft:0, flex:3}}>
                    {iconSet(props.transaction.category)}
                    <View style={{flex:1}}>
                        <Text style={{fontFamily:"Poppins_600SemiBold", fontSize: 17}}>{ capitalizeFirstLetter(props.transaction.title) }</Text>
                        <Text style={{fontFamily:"Poppins_500Medium", marginTop:-5}}>{props.transaction.createdAt.split("T")[0]}</Text>
                        {/* <Text style={{fontFamily:"Poppins_500Medium", marginTop:-5}}>{ capitalizeFirstLetter(props.transaction.type) }</Text> */}
                    </View>
                </View>
                <Text style={{fontFamily:"Poppins_500Medium"}}>Rp { props.transaction.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") }</Text>
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
export default ListItemMyTransaction