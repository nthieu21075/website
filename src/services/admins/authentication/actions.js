export const AuthFormActions = {
  ERROR: '@adminAuthForm/error',
  SUCCESS: '@adminAuthForm/success',
  UPDATE_AUTH_DATA: '@adminAuthForm/updateData',
  UPDATE_MSG: '@adminAuthForm/updateMsg',
  INITIALIZE: '@adminAuthForm/init'
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
