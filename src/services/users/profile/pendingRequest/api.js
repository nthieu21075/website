import { userApi } from 'global/apiConfig'
import { SubmissionError } from 'redux-form'
import { userCheckApiResponse } from 'helpers/apiResponse'
import { updatePendingRequestState } from 'services/users/profile/pendingRequest/actions'

export const getPendingRequest = () => {
  return dispatch => {
    const url = `/api/user/pending-request`
    userApi().get(url).then(function (response) {
      const apiResponse = response.data
      userCheckApiResponse(response, apiResponse, dispatch, () => {
        dispatch(updatePendingRequestState(apiResponse.data))
      })

      return Promise.resolve()
    })
    .catch(function (error) {
      throw new SubmissionError({ _error: error.message })
    })
  }
}
