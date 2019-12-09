/**
 The quantity of the products that the user has.
 */
import { UserTeamActions } from './userTeamActions'

const initialState = {
  data: []
}

const userTeamReducer = (state = initialState, action) => {
  switch (action.type) {
    case UserTeamActions.UPDATE_DATA: {
      return {
        ...state,
        data: action.data,
      }
    }

    case UserTeamActions.INITIALIZE: {
      return initialState
    }

    default: {
      return state
    }
  }
}

export default userTeamReducer
