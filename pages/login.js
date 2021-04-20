import React, { useEffect, useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text, View, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import logo from '../assets/logins.png';
import logoRukun from '../assets/logo.png';
import { login } from '../store/actions/usersActions'
import { useDispatch } from 'react-redux'
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
});  

const Login = ({route, navigation}) =>{
    const dispatch = useDispatch()
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const dispatch = useDispatch()
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

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
            <ImageBackground source={logo} style={styles.image}>
                <Image source={logoRukun} style={{height:150, width: 150, marginTop: 100}}></Image>
                <View style={{width: "100%", paddingHorizontal: 30}}>
                    <TextInput
                        label="Email"
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
                    <Button mode="contained" style={{height:50, justifyContent: 'center'}} onPress={()=>handleSubmit()}>Login</Button>
                </View>
                <View style={{width: "100%", paddingHorizontal: 30, marginTop: 10, alignItems: "center"}}>
                    <Text>Dont have an account ? Create</Text>
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

export default Login