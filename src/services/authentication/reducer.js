/**
 The quantity of the products that the user has.
 */
import { AuthFormActions } from './actions'

const initialState = {
  user: {},
  errors: null,
  success: null,
  logged: false,
  apiToken: ''
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AuthFormActions.ERROR: {
      return {
        ...state,
        errors: action.errors,
        success: null
      }
    }

    case AuthFormActions.SUCCESS: {
      return {
        ...state,
        apiToken: action.apiToken,
        user: action.user,
        errors: null,
        logged: true
      }
    }

    case AuthFormActions.UPDATE_AUTH_DATA: {
      return {
        ...state,
        user: action.user,
        errors: null
      }
    }

    case AuthFormActions.UPDATE_MSG: {
      return {
        ...state,
        success: action.message,
        errors: null
      }
    }

    case AuthFormActions.INITIALIZE: {
      return initialState
    }

    default: {
      return state
    }
  }
}

export default authReducer
