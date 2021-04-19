import React, { useEffect, useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import logo from '../assets/logins.png';
import logoRukun from '../assets/rukun-logo-transparent-blue.png';
import { register } from '../store/actions/usersActions'
import { useDispatch } from 'react-redux'

const Register = ({route, navigation}) =>{
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');
    const [inviteCode, setInviteCode] = React.useState('');
    const dispatch = useDispatch()

    const handleSubmit = ()=>{
        dispatch(register(navigation,username,password,name,inviteCode))
        navigation.navigate("Login");
    }

    return(
        <View style={styles.container}>
            <ImageBackground source={logo} style={styles.image}>
                <Image source={logoRukun} style={{height:200, width: 200, marginTop: 70}}></Image>
                <View style={{width: "100%", paddingHorizontal: 30, marginTop: 10}}>
                    <TextInput
                        label="Name"
                        mode = "outlined"
                        value={name}
                        onChangeText={name => setName(name)}
                        style={{backgroundColor:"white"}}
                        left={
                            <TextInput.Icon
                            name="pencil" // where <Icon /> is any component from vector-icons or anything else
                            onPress={() => {}}
                            />
                        }
                    />
                </View>
                <View style={{width: "100%", paddingHorizontal: 30, marginTop: 10}}>
                    <TextInput
                        label="Username"
                        mode = "outlined"
                        value={username}
                        onChangeText={username => setUsername(username)}
                        style={{backgroundColor:"white"}}
                        left={
                            <TextInput.Icon
                            name="account" // where <Icon /> is any component from vector-icons or anything else
                            onPress={() => {}}
                            />
                        }
                    />
                </View>
                <View style={{width: "100%", paddingHorizontal: 30, marginTop: 10}}>
                    <TextInput
                        label="Password"
                        mode = "outlined"
                        value={password}
                        onChangeText={password => setPassword(password)}
                        style={{backgroundColor:"white"}}
                        secureTextEntry={true}
                        left={
                            <TextInput.Icon
                            name="lock-outline" 
                            onPress={() => {}}
                            />
                        }
                    />
                </View>
                <View style={{width: "100%", paddingHorizontal: 30, marginTop: 10}}>
                    <TextInput
                        label="Invitation Code"
                        mode = "outlined"
                        value={inviteCode}
                        onChangeText={inviteCode => setInviteCode(inviteCode)}
                        style={{backgroundColor:"white"}}
                        left={
                            <TextInput.Icon
                            name="mail" // where <Icon /> is any component from vector-icons or anything else
                            onPress={() => {}}
                            />
                        }
                    />
                </View>
                <View style={{width: "100%", paddingHorizontal: 30, marginTop: 25}}>
                    <Button mode="contained" style={{height:50, justifyContent: 'center', backgroundColor: '#3C5CAC'}} onPress={()=>handleSubmit()}>Register</Button>
                </View>
                <View style={{width: "100%", paddingHorizontal: 30, marginTop: 10, alignItems: "center"}}>
                    <Text>Already have an account? <Text onPress={() => navigation.navigate('Login')}>Login</Text></Text>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'blue',
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
        flex: 1,
        width: "100%",
        resizeMode: "cover",
        alignItems: 'center'
      },
});

export default Register



