import { userApi } from 'global/apiConfig'
import { SubmissionError } from 'redux-form'
import { updateRecommendTournament, updateTournament } from './actions'
import { userCheckApiResponse } from 'helpers/apiResponse'

export const getTournaments = (id) => {
  return dispatch => {
    userApi().get(`/api/user/tournaments/${id}`).then(function (response) {
      const apiResponse = response.data

      userCheckApiResponse(response, apiResponse, dispatch, () => {
        if (id == 'recomended') {
          dispatch(updateRecommendTournament(apiResponse.data))
        } else {
          dispatch(updateTournament(apiResponse.data))
        }
      })

      return Promise.resolve()
    })
    .catch(function (error) {
      throw new SubmissionError({ _error: error.message })
    })
  }
}
