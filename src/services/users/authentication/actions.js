export const AuthFormActions = {
  ERROR: '@authForm/error',
  SUCCESS: '@authForm/success',
  UPDATE_AUTH_DATA: '@authForm/updateData',
  UPDATE_MSG: '@authForm/updateMsg',
  INITIALIZE: '@authForm/init'
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
