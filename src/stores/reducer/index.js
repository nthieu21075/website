import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import authReducer from 'services/authentication/reducer'
import categoryReducer from 'services/organizers/category/reducer'
import globalReducer from 'services/organizers/global/reducer'
import messageReducer from 'services/organizers/message/reducer'
import tournamentReducer from 'services/organizers/tournaments/reducer'

export default combineReducers({
  authentication: authReducer,
  organizers: combineReducers({
    global: globalReducer,
    categories: categoryReducer,
    message: messageReducer,
    tournamentPage: tournamentReducer
  }),
  form: formReducer
})
