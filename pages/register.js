import React, { useEffect, useState, useRef, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { FancyAlert } from 'react-native-expo-fancy-alerts'
import { TextInput, Button } from 'react-native-paper';
import logo from '../assets/logins.png';
import logoRukun from '../assets/rukun-logo-transparent-blue.png';
import { register } from '../store/actions/user'
import { useDispatch, useSelector } from 'react-redux'

const Register = ({route, navigation}) =>{
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [visible, setVisible] = useState(false)
    const [name, setName] = React.useState('');
    const [inviteCode, setInviteCode] = React.useState('');
    const dispatch = useDispatch()

    const toggleAlert = useCallback(() => {
        setVisible(!visible);
    }, [visible]);

    const handleSubmit = () =>{
        dispatch(register(navigation,username,password,name,inviteCode))
        if (error !== null) {
            toggleAlert()
        }
    }

    const { error } = useSelector(state => state.userReducer)

    return(
        <View style={styles.container}>
            <FancyAlert
             visible={visible}
             icon={<View style={{
               flex: 1,
               display: 'flex',
               justifyContent: 'center',
               alignItems: 'center',
               backgroundColor: '#3C5CAC',
               borderRadius: 50,
               width: '100%',
             }}><Image style={{ width: 45, height: 45 }} source={require('../assets/rukun-logo-96.png')} /></View>}
             style={{ backgroundColor: 'white' }}
           >
             <Text style={{ marginTop: -16, marginBottom: 22, fontSize:18, textAlign: 'center' }}>{error}</Text>
             <TouchableOpacity style={styles.btn} onPress={toggleAlert}>
               <Text style={styles.btnText}>OK</Text>
             </TouchableOpacity>
           </FancyAlert>
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
    btn: {
      borderRadius: 32,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 8,
      paddingVertical: 8,
      alignSelf: 'stretch',
      backgroundColor: '#3C5CAC',
      marginTop: 12,
      minWidth: '50%',
      marginBottom: 5
    },
    btnText: {
      color: '#FFFFFF',
      alignItems: 'center'
    }
});

export default Register
