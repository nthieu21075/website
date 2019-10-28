import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import authReducer from '../../services/authentication/reducer'

export default combineReducers({
  authentication: authReducer,
  form: formReducer
})
