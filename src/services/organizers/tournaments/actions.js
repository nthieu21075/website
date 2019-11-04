export const TournamentActions = {
  UPDATE_BASIC_INFORMATION: '@organizerTournament/update_basic_information',
  INITIALIZE: '@organizerTournament/init'
}

export const initTourmanetState = () => (dispatch) => {
  dispatch({ type: TournamentActions.INITIALIZE })
}

export const updateBasicInformation = (data) => (dispatch) => {
  dispatch({
    type: TournamentActions.UPDATE_BASIC_INFORMATION,
    data: data
  })
}