import React, { useEffect, useState, useRef, useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { FancyAlert } from 'react-native-expo-fancy-alerts'
import { TextInput, Button } from 'react-native-paper';
import logo from '../assets/logins.png';
import logoRukun from '../assets/rukun-logo-transparent-blue.png';
import { login } from '../store/actions/usersActions'
import { useDispatch } from 'react-redux'
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SyncStorage from 'sync-storage'

// const data = await SyncStorage.init();
// console.log('AsyncStorage is ready!', data)

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
});  

const Login = ({route, navigation}) =>{
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [visible, setVisible] = useState(false)
    const dispatch = useDispatch()
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    const toggleAlert = useCallback(() => {
      setVisible(!visible);
    }, [visible]);

    useEffect(() => {
      registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
      });

      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
      });

      return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
      };
    }, []);

    const handleSubmit = ()=>{
      dispatch(login(navigation,username,password,expoPushToken))
      if (SyncStorage.get('loginError') === 'ini error') {
        toggleAlert()
        SyncStorage.set('loginError', '')
      } else {
        navigation.navigate("Dashboard");
      }
    }

    const registerForPushNotificationsAsync = async() => {
        let token;
        if (Constants.isDevice) {
          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }
          token = (await Notifications.getExpoPushTokenAsync()).data;
          console.log(token);
          console.log(Constants.manifest.id,"wakwaw");
        } else {
          alert('Must use physical device for Push Notifications');
        }
      
        if (Platform.OS === 'android') {
          Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }
        return token;
      }

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
            <Text style={{ marginTop: -16, marginBottom: 22, fontSize:18, textAlign: 'center' }}>Invalid username or password. Please try again.</Text>
            <TouchableOpacity style={styles.btn} onPress={toggleAlert}>
              <Text style={styles.btnText}>OK</Text>
            </TouchableOpacity>
          </FancyAlert>
            <ImageBackground source={logo} style={styles.image}>
                <Image source={logoRukun} style={{height:200, width: 200, marginTop: 100}}></Image>
                <View style={{width: "100%", paddingHorizontal: 30, marginTop: 20}}>
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
                <View style={{width: "100%", paddingHorizontal: 30, marginTop: 20}}>
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
                <View style={{width: "100%", paddingHorizontal: 30, marginTop: 30}}>
                    <Button mode="contained" style={{height:50, justifyContent: 'center', backgroundColor: '#3C5CAC'}} onPress={()=>handleSubmit()}>Login</Button>
                </View>
                <View style={{width: "100%", paddingHorizontal: 30, marginTop: 15, alignItems: "center"}}>
                    <Text>Don't have an account? <Text onPress={() => navigation.navigate('Register')}>Register</Text></Text>
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
      marginTop: 16,
      minWidth: '50%',
      marginBottom: 5
    },
    btnText: {
      color: '#FFFFFF',
      alignItems: 'center'
    }
});

export default Login