export const TournamentActions = {
  UPDATE_BASIC_INFORMATION: '@organizerTournament/update_basic_information',
  UPDATE_TEAM_MANAGEMENT: '@organizerTournament/update_team_management',
  UPDATE_LOADINNG: '@organizerTournament/update_loading',
  INITIALIZE: '@organizerTournament/init'
}

export const initTourmanetState = () => (dispatch) => {
  dispatch({ type: TournamentActions.INITIALIZE })
}

export const loadingTourmanetState = () => (dispatch) => {
  dispatch({ type: TournamentActions.UPDATE_LOADINNG })
}

export const updateBasicInformation = (data) => (dispatch) => {
  dispatch({
    type: TournamentActions.UPDATE_BASIC_INFORMATION,
    data: data
  })
}

export const updateTeamManagement = (data) => (dispatch) => {
  dispatch({
    type: TournamentActions.UPDATE_TEAM_MANAGEMENT,
    data: data
  })
}