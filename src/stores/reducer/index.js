import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import authReducer from 'services/authentication/reducer'
import categoryReducer from 'services/organizers/category/reducer'
import messageReducer from 'services/organizers/message/reducer'

export default combineReducers({
  authentication: authReducer,
  organizers: combineReducers({
    categories: categoryReducer,
    message: messageReducer
  }),
  form: formReducer
})
