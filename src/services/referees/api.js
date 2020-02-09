import { messageError, messageSuccess } from 'services/referees/message/actions'
import { refereeApi, refereeApiFormData } from 'global/apiConfig'
import { SubmissionError } from 'redux-form'
import Navigator from 'helpers/history'
import { refereeCheckApiResponse } from 'helpers/apiResponse'

export const getInvitedMatch = (type, callback) => {
  return dispatch => {
    refereeApi().get('api/referee/invited-match/' + type).then(function (response) {
      const apiResponse = response.data
      refereeCheckApiResponse(response, apiResponse, dispatch, () => {
        callback(apiResponse.data)
      })

      return Promise.resolve()
    })
    .catch(function (error) {
      throw new SubmissionError({ _error: error.message })
    })
  }
}


export const updateMatchInfo = (params, callback) => {
  return dispatch => {
    refereeApi().post('/api/referee/update-match-info', params).then(function (response) {
      const apiResponse = response.data

      refereeCheckApiResponse(response, apiResponse, dispatch, () => {
        callback()
      })

      return Promise.resolve()
    })
    .catch(function (error) {
      throw new SubmissionError({ _error: error.message })
    })
  }
}