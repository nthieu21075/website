/**
 The quantity of the products that the user has.
 */
import { CategoryActions } from './actions'

const initialState = {
  data: []
}

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case CategoryActions.UPDATE_DATA: {
      return {
        ...state,
        data: action.categories
      }
    }

    case CategoryActions.INITIALIZE: {
      return initialState
    }

    default: {
      return state
    }
  }
}

export default categoryReducer
