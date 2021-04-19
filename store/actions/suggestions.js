export function setSuggestions(payload) {
  return { type: 'setSuggestions', payload }
}
  
export function setSuggestionsAsync() {
  const url = 'http://192.168.0.3:4000/suggestion'
  
  return (dispatch) => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        dispatch(setSuggestions(data))
      })
      .catch(err => console.log(err))
  }
}