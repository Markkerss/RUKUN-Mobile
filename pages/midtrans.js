import React, { useEffect, useState } from 'react';
import { Text } from 'react-native';
import { WebView } from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Midtrans = ({route}) =>{
    const { amount, category, notes} = route.params;
    const [user, setUser] = useState({})
    const [token, setToken] = useState(null)
    const [loading, setLoading] = useState(false)

    async function getUser() {
        setLoading(true)
        try {
            const userString = await AsyncStorage.getItem('user')
            const tokenString = await AsyncStorage.getItem('token')
            const userJSON = JSON.parse(userString)
            setUser(userJSON)
            setToken(tokenString)
            setLoading(false)
        } catch (error) {
            console.log(error);
        }
    }
    
    useEffect(() => {
        console.log("wakwaw");
        getUser()
    }, [])
    if (!token) {
        return <Text>loading</Text>
    }else{
        return(
            <WebView style={{marginTop:30}}
                onNavigationStateChange={(e)=>{console.log(e)}}
                source={{ 
                    uri: `https://rukun-server.herokuapp.com/midtrans?amount=${amount}&category=${category}&note=${notes}&title=${notes}&username=fadhoo`,
                    headers: {
                        'access_token': token,
                      },
                    // body: `amount=${amount}&category=${category}&notes=${notes}&username=fadhoo`
                }
            } />
        )
    }

}

export default Midtrans