export const AuthFormActions = {
  ERROR: '@organizerAuthForm/error',
  SUCCESS: '@organizerAuthForm/success',
  UPDATE_AUTH_DATA: '@organizerAuthForm/updateData',
  UPDATE_MSG: '@organizerAuthForm/updateMsg',
  INITIALIZE: '@organizerAuthForm/init'
}

export const initAuthState = () => (dispatch) => {
  dispatch({ type: AuthFormActions.INITIALIZE })
}

export const authSuccess = (data, token) => (dispatch) => {
  dispatch({
    type: AuthFormActions.SUCCESS,
    data: data,
    apiToken: token
  })
}

export const updateAuthData = (data) => (dispatch) => {
  dispatch({
    type: AuthFormActions.UPDATE_AUTH_DATA,
    data: data
  })
}
