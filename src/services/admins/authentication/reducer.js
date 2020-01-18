/**
 The quantity of the products that the user has.
 */
import { AuthFormActions } from './actions'

const initialState = {
  logged: false,
  apiToken: '',
  data: null
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AuthFormActions.SUCCESS: {
      return {
        ...state,
        apiToken: action.apiToken,
        data: action.data,
        logged: true
      }
    }

    case AuthFormActions.UPDATE_AUTH_DATA: {
      return {
        ...state,
        data: action.data,
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
