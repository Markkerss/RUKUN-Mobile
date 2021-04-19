import { combineReducers } from 'redux'
import transactionsReducer from './transactionsReducer'
import suggestionsReducer from './suggestionsReducer'
import desaReducer from './desaReducer'
import userReducer from './userReducer'

const reducer = combineReducers({
  transactionsReducer,
  suggestionsReducer,
  desaReducer,
  userReducer,
})

export default reducer
