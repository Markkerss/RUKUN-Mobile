const initialState = {
  suggestions: [],
  loading: false,
  error: null
}
  
function suggestionsReducer(state = initialState, action) {
  const { type, payload } = action
  if(type === 'setSuggestions') {
    return { ...state, suggestions: payload }
  }else if (type === 'addSuggestions') {
    return { ...state, suggestions: [payload, ...state.suggestions] }
  }
  else if (type === 'isLoadingSuggestions') {
    return { ...state, loading: payload }
  } else if (type === 'isErrorTransactions') {
    return { ...state, error: payload }
  }
  return state
}
  
export default suggestionsReducer
  