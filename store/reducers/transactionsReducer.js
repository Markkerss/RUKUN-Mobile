const initialState = {
  transactions: []
}
  
function transactionsReducer(state = initialState, action) {
  const { type, payload } = action
  if(type === 'setTransactions') {
    return { ...state, transactions: payload }
  } 
  return state
}
  
export default transactionsReducer
  