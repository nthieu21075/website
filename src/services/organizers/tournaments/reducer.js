/**
 The quantity of the products that the user has.
 */
import { TournamentActions } from './actions'

const initialState = {
  isLoading: true,
  basicInformation: {}
}

const tournamentReducer = (state = initialState, action) => {
  switch (action.type) {
    case TournamentActions.UPDATE_BASIC_INFORMATION: {
      return {
        ...state,
        isLoading: false,
        basicInformation: action.data
      }
    }

    case TournamentActions.INITIALIZE: {
      return initialState
    }

    default: {
      return state
    }
  }
}

export default tournamentReducer
