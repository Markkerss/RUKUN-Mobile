export function setTransactions(payload) {
  return { type: 'setTransactions', payload }
}
  
export function setTransactionsAsync() {
  const url = 'http://192.168.0.3:3000/transactions'
  return (dispatch) => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log(data, "<<<<data")
        dispatch(setTransactions(data))
      })
      .catch(err => console.log(err))
  }
}