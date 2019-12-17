export const PendingRequestActions = {
  UPDATE_DATA: '@userPendingRequest/update_data',
  INITIALIZE: '@userPendingRequest/init'
}

export const initTourmanetState = () => (dispatch) => {
  dispatch({ type: PendingRequestActions.INITIALIZE })
}

export const updatePendingRequestState = (data) => (dispatch) => {
  dispatch({ type: PendingRequestActions.UPDATE_DATA, data: data })
}

