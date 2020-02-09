export const AuthFormActions = {
  ERROR: '@refereeAuthForm/error',
  SUCCESS: '@refereeAuthForm/success',
  UPDATE_AUTH_DATA: '@refereeAuthForm/updateData',
  UPDATE_MSG: '@refereeAuthForm/updateMsg',
  INITIALIZE: '@refereeAuthForm/init'
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
