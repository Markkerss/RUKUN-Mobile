const initialState = {
  user: {}
}
  
function usersReducer(state = initialState, action) {
  const { type, payload } = action
  if(type === 'setUser') {
    return { ...state, user: payload }
  } 
  return state
}
  
export default usersReducer
  