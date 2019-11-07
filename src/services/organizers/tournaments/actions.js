export const TournamentActions = {
  UPDATE_BASIC_INFORMATION: '@organizerTournament/update_basic_information',
  UPDATE_TEAM_MANAGEMENT: '@organizerTournament/update_team_management',
  UPDATE_AVAILABLE_TEAM: '@organizerTournament/update_availabel_team',
  ADD_AVAILABLE_TEAM: '@organizerTournament/add_availabel_team',
  REMOVE_TOURNAMENT_TEAM: '@organizerTournament/remove_tournament_team',
  UPDATE_LOADINNG: '@organizerTournament/update_loading',
  UPDATE_TOURNAMENT_TABLE: '@organizerTournament/update_tournament_table',
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

export const updateAvailableTeam = (data) => (dispatch) => {
  dispatch({
    type: TournamentActions.UPDATE_AVAILABLE_TEAM,
    data: data
  })
}

export const addTournamentTeam = (data) => (dispatch) => {
  dispatch({
    type: TournamentActions.ADD_AVAILABLE_TEAM,
    data: data
  })
}

export const removeTournamentTeam = (data) => (dispatch) => {
  dispatch({
    type: TournamentActions.REMOVE_TOURNAMENT_TEAM,
    data: data
  })
}

export const updateTeamManagementTable = (data) => (dispatch) => {
  dispatch({
    type: TournamentActions.UPDATE_TOURNAMENT_TABLE,
    data: data
  })
}