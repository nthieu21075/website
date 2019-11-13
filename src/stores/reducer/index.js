import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

// Users
import userAuthReducer from 'services/users/authentication/reducer'
import userMessageReducer from 'services/users/message/reducer'
import userCategoryReducer from 'services/users/category/reducer'
import userTournamentReducer from 'services/users/tournaments/reducer'

// Oganizer
import organizerAuthReducer from 'services/organizers/authentication/reducer'
import categoryReducer from 'services/organizers/category/reducer'
import globalReducer from 'services/organizers/global/reducer'
import messageReducer from 'services/organizers/message/reducer'
import tournamentReducer from 'services/organizers/tournaments/reducer'

export default combineReducers({
  users: combineReducers({
    auth: userAuthReducer,
    message: userMessageReducer,
    categories: userCategoryReducer,
    tournaments: userTournamentReducer
  }),
  organizers: combineReducers({
    auth: organizerAuthReducer,
    global: globalReducer,
    categories: categoryReducer,
    message: messageReducer,
    tournamentPage: tournamentReducer
  }),
  form: formReducer
})
