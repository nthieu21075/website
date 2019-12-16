export const TournamentActions = {
  UPDATE_DATA: '@userTournemnt/data',
  UPDATE_RECOMMEND: '@userTournemnt/recommend_data',
  INITIALIZE: '@userTournemnt/init'
}

export const updateTournament = (data) => (dispatch) => {
  dispatch({
    type: TournamentActions.UPDATE_DATA,
    data: data
  })
}

export const updateRecommendTournament = (data) => (dispatch) => {
  dispatch({
    type: TournamentActions.UPDATE_RECOMMEND,
    data: data
  })
}



