export const AuthFormActions = {
  ERROR: '@authForm/error',
  SUCCESS: '@authForm/success',
  UPDATE_AUTH_DATA: '@authForm/updateData',
  INITIALIZE: '@authForm/init'
}

export const initAuthState = () => (dispatch) => {
  dispatch({ type: AuthFormActions.INITIALIZE })
}

export const authFail = (errors) => (dispatch) => {
  dispatch({
    type: AuthFormActions.ERROR,
    errors: errors
  })
}

export const authSuccess = (user, token) => (dispatch) => {
  dispatch({
    type: AuthFormActions.SUCCESS,
    user: user,
    apiToken: token
  })
}

export const updateAuthData = (user, message) => (dispatch) => {
  dispatch({
    type: AuthFormActions.UPDATE_AUTH_DATA,
    user: user,
    message: message
  })
}
