export const CategoryActions = {
  UPDATE_DATA: '@organizerCategory/data',
  INITIALIZE: '@authForm/init'
}

export const initCategoryState = () => (dispatch) => {
  dispatch({ type: CategoryActions.INITIALIZE })
}

export const updateCategoryData = (categories) => (dispatch) => {
  dispatch({
    type: CategoryActions.UPDATE_DATA,
    categories: categories
  })
}