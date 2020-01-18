export const GlobalActions = {
  UPDATE_SIDEBAR_ACTIVE: '@adminGlobal/side_bar_active',
  INITIALIZE: '@adminGlobal/init'
}

export const initGlobalState = () => (dispatch) => {
  dispatch({ type: GlobalActions.INITIALIZE })
}

export const updateSideBarActive = (data) => (dispatch) => {
  dispatch({
    type: GlobalActions.UPDATE_SIDEBAR_ACTIVE,
    data: data
  })
}
