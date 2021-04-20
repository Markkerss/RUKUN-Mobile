const url = 'https://rukun-server.herokuapp.com/'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

export function login(navigation,username,password,push_token) {
    return (dispatch) => {
        const payload = {username,password,push_token}
        axios.post(url + 'user/login', payload, {
            // headers: { token: "" }
        })
        .then(async (res) => {
            console.log(res.data,"ini data user");
            await AsyncStorage.setItem('token', res.data)

            return axios.get(url + 'user/', {
                headers: { access_token: res.data }
            })
        })
        .then(async (user) => {
            console.log(user.data,"ini data user 2");
            await AsyncStorage.setItem('user', JSON.stringify(user.data) )
            navigation.navigate("Dashboard")
        })
        .catch(error => {
            console.log(error)
        })
    }
  }