export const GlobalActions = {
  UPDATE_SIDEBAR_ACTIVE: '@adminGlobal/side_bar_active',
  UPDATE_CATEGORIES: '@adminGlobal/update_categories',
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

export const updateCategories = (data) => (dispatch) => {
  dispatch({
    type: GlobalActions.UPDATE_CATEGORIES,
    data: data
  })
}