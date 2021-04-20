const url = 'http://192.168.0.3:4000/'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

export function login(navigation,username,password,push_token) {
    return (dispatch) => {
        const payload = {username,password,push_token}
        axios.post(url + 'user/login', payload, {
        })
        .then(async (res) => {
            console.log(res.data,"ini data");
            await AsyncStorage.setItem('access_token', res.data)
            navigation.navigate("Dashboard")
        })
        .catch(error => {
            console.log(error.response)
        })
    }
  }