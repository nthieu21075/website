export const AuthFormActions = {
  ERROR: '@authForm/error',
  SUCCESS: '@authForm/success',
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

export const authSuccess = (user) => (dispatch) => {
  dispatch({
    type: AuthFormActions.SUCCESS,
    user: user
  })
}
