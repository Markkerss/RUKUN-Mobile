const url = 'https://rukun-server.herokuapp.com/'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'

export function setSuggestions(payload) {
  return { type: 'setSuggestions', payload }
}
  

export function setSuggestionsAsync() {
  return async (dispatch) => {
    dispatch({type: "isLoadingSuggestion", payload:true })
    dispatch({type: "isErrorSuggestion", payload:null })
    const token = await AsyncStorage.getItem('token')
    console.log(token);
    axios.get(url + 'suggestions', {
      headers: { access_token: token }
    })
    .then(res => {
      console.log(res.data,"ini data suggestion");
      dispatch(setSuggestions(res.data.Suggestions))
      dispatch({type: "isLoadingSuggestion", payload:false })
    })
    .catch(error => {
        console.log(error.response)
        dispatch({type: "isErrorSuggestion", payload:error.response })
        dispatch({type: "isLoadingSuggestion", payload:false })
    })
  }
}

export function createSuggestionsAsync(data) {
  return async (dispatch) => {
    dispatch({type: "isLoadingSuggestion", payload:true })
    dispatch({type: "isErrorSuggestion", payload:null })
    const token = await AsyncStorage.getItem('token')
    console.log(token);
    axios.post(url + 'suggestions', data, {
      headers: { access_token: token }
    })
    .then(res => {
      console.log(res.data,"ini data create suggestion");
      dispatch({type:"addSuggestions", payload: res.data})
      dispatch({type: "isLoadingSuggestion", payload:false })
    })
    .catch(error => {
        console.log(error.response)
        dispatch({type: "isErrorSuggestion", payload:error.response })
        dispatch({type: "isLoadingSuggestion", payload:false })
    })
  }
}