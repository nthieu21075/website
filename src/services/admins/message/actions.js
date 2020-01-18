export const MessageActions = {
  ERROR: '@adminMessage/error',
  SUCCESS: '@adminMessage/success',
  INITIALIZE: '@adminMessage/init'
}

export const initMessageState = () => (dispatch) => {
  dispatch({ type: MessageActions.INITIALIZE })
}

export const messageError = (errors) => (dispatch) => {
  dispatch({
    type: MessageActions.ERROR,
    errors: errors
  })
}

export const messageSuccess = (success) => (dispatch) => {
  dispatch({
    type: MessageActions.SUCCESS,
    success: success
  })
}