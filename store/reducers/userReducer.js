const initialState = {
  error: null
}
  
function userReducer(state = initialState, action) {
  const { type, payload } = action
  if (type === 'isErrorUser') {
    return { ...state, error: payload }
  }
  return state
}
  
export default userReducer