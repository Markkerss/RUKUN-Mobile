import { combineReducers } from 'redux'
import transactionsReducer from './transactionsReducer'
import suggestionsReducer from './suggestionsReducer'

const reducer = combineReducers({
  transactionsReducer,
  suggestionsReducer
})

export default reducer
