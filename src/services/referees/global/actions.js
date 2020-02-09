export const GlobalActions = {
  UPDATE_SIDEBAR_ACTIVE: '@refereeGlobal/side_bar_active',
  UPDATE_CATEGORIES: '@refereeGlobal/update_categories',
  INITIALIZE: '@refereeGlobal/init'
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