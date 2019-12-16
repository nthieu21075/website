import { organierApi } from 'global/apiConfig'
import { SubmissionError } from 'redux-form'
import { checkApiResponse } from 'helpers/apiResponse'
import { updatePendingRequestState } from 'services/organizers/tournaments/pendingRequest/actions'
import { messageError, messageSuccess } from 'services/organizers/message/actions'

export const getPendingRequest = () => {
  return dispatch => {
    const url = `/api/organizer/tournament/pending-request`
    organierApi().get(url).then(function (response) {
      const apiResponse = response.data
      checkApiResponse(response, apiResponse, dispatch, () => {
        dispatch(updatePendingRequestState(apiResponse.data))
      })

      return Promise.resolve()
    })
    .catch(function (error) {
      throw new SubmissionError({ _error: error.message })
    })
  }
}

export const approvePendingRequest = (tournamentId, callback) => {
  return dispatch => {
    const url = `/api/organizer/tournament/approve-pending-request`
    organierApi().post(url, { tournamentId: tournamentId }).then(function (response) {
      const apiResponse = response.data
      checkApiResponse(response, apiResponse, dispatch, () => {
        callback()
        dispatch(updatePendingRequestState(apiResponse.data))
      })

      return Promise.resolve()
    })
    .catch(function (error) {
      throw new SubmissionError({ _error: error.message })
    })
  }
}

export const unapprovePendingRequest = (tournamentId, callback) => {
  return dispatch => {
    const url = `/api/organizer/tournament/unapprove-pending-request`
    organierApi().post(url, { tournamentId: tournamentId }).then(function (response) {
      const apiResponse = response.data
      checkApiResponse(response, apiResponse, dispatch, () => {
        callback()
        dispatch(updatePendingRequestState(apiResponse.data))
      })

      return Promise.resolve()
    })
    .catch(function (error) {
      throw new SubmissionError({ _error: error.message })
    })
  }
}
