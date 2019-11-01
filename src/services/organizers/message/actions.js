export const MessageActions = {
  ERROR: '@organizerMessage/error',
  SUCCESS: '@organizerMessage/success',
  INITIALIZE: '@organizerMessage/init'
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