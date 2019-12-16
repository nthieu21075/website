import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

// Users
import userAuthReducer from 'services/users/authentication/reducer'
import userMessageReducer from 'services/users/message/reducer'
import userCategoryReducer from 'services/users/category/reducer'
import userTournamentReducer from 'services/users/tournaments/reducer'
import userTeamReducer from 'services/users/profile/userTeamReducer'

// Oganizer
import organizerAuthReducer from 'services/organizers/authentication/reducer'
import categoryReducer from 'services/organizers/category/reducer'
import globalReducer from 'services/organizers/global/reducer'
import messageReducer from 'services/organizers/message/reducer'
import tournamentReducer from 'services/organizers/tournaments/reducer'
import pendingRequestReducer from 'services/organizers/tournaments/pendingRequest/reducer'

export default combineReducers({
  users: combineReducers({
    auth: userAuthReducer,
    message: userMessageReducer,
    categories: userCategoryReducer,
    tournaments: userTournamentReducer,
    userTeam: userTeamReducer
  }),
  organizers: combineReducers({
    auth: organizerAuthReducer,
    global: globalReducer,
    categories: categoryReducer,
    message: messageReducer,
    tournamentPage: tournamentReducer,
    pendingRequests: pendingRequestReducer
  }),
  form: formReducer
})
