/**
 The quantity of the products that the user has.
 */
import { MessageActions } from './actions'

const initialState = {
  errors: null,
  success: null
}

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case MessageActions.ERROR: {
      return {
        ...state,
        errors: action.errors,
        success: null
      }
    }

    case MessageActions.SUCCESS: {
      return {
        ...state,
        success: action.success,
        error: null
      }
    }

    case MessageActions.INITIALIZE: {
      return initialState
    }

    default: {
      return state

    }
  }
}

export default messageReducer
