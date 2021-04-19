const url = 'http://192.168.100.104:3000/'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

export function login(navigation,username,password) {
    return (dispatch) => {
        const payload = {username,password}
        axios.post(url + 'user/login', payload, {
            // headers: { token: "" }
        })
        .then(async (res) => {
            console.log(res.data,"ini data");
            await AsyncStorage.setItem('token', res.data)
            navigation.navigate("Dashboard")
        })
        .catch(error => {
            console.log(error.response)
        })
    }
  }