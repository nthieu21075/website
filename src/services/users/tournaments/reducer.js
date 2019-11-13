/**
 The quantity of the products that the user has.
 */
import { TournamentActions } from './actions'

const initialState = {
  data: [],
  recommend: []
}

const tournamentReducer = (state = initialState, action) => {
  switch (action.type) {
    case TournamentActions.UPDATE_DATA: {
      return {
        ...state,
        data: action.data,
        recommend: state.recommend
      }
    }

    case TournamentActions.UPDATE_RECOMMEND: {
      return {
        ...state,
        data: state.data,
        recommend: action.data
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
