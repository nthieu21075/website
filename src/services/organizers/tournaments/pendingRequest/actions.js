export const PendingRequestActions = {
  UPDATE_DATA: '@organizerPendingRequest/update_data',
  INITIALIZE: '@organizerPendingRequest/init'
}

export const initTourmanetState = () => (dispatch) => {
  dispatch({ type: PendingRequestActions.INITIALIZE })
}

export const updatePendingRequestState = (data) => (dispatch) => {
  dispatch({ type: PendingRequestActions.UPDATE_DATA, data: data })
}

