const url = 'https://rukun-server.herokuapp.com/'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';

export function login(navigation,username,password,push_token) {
    return (dispatch) => {
        dispatch({type: "isErrorUser", payload:null })
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
            dispatch({type: "isErrorUser", payload:"Invalid username or password." })
            console.log(error)
        })
    }
}

export function register(navigation,username,password,name,invitation_code) {
    return (dispatch) => {
        dispatch({type: "isErrorUser", payload:null })
        const payload = {username,password,name,invitation_code}
        axios.post(url + 'user/register', payload, {
        })
        .then(res => {
            dispatch({type: "isErrorUser", payload:'Successfully registered!' })
            navigation.navigate("Login")
        })
        .catch(error => {
            console.log(error,"<<<error")
            console.log(error.response.data, "<<<ini error")
            const errors = error.response.data.message
            if (Array.isArray(errors)) {
                let stringErr = ''
                errors.map(errorr => {
                    if (errorr === 'More than six characters are required') {
                        stringErr = stringErr.concat('Password must consist of a minimum of 6 characters. ')
                    } else if (errorr === 'username must be unique') {
                        stringErr = stringErr.concat('Username has been taken. Please choose another username. ')
                    } else {
                        stringErr = stringErr.concat(errorr, '. ')
                    }
                })
                console.log(stringErr, "<<<<stringErr")
                dispatch({type: "isErrorUser", payload:stringErr })
            } else {
                dispatch({type: "isErrorUser", payload:'Invitation code invalid' })
            }
        })
    }
} 