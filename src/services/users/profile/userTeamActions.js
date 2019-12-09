export const UserTeamActions = {
  UPDATE_DATA: '@userTeamActions/data',
  INITIALIZE: '@userTeamActions/init'
}

export const updateUserTeamData = (data) => (dispatch) => {
  dispatch({
    type: UserTeamActions.UPDATE_DATA,
    data: data
  })
}

