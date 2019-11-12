import { ApiFormData, Api } from 'global/apiConfig'
import { SubmissionError } from 'redux-form'
import { updateSchedule } from 'services/organizers/tournaments/actions'
import { checkApiResponse } from 'helpers/apiResponse'
import moment from 'moment'

export const getSchedule = (id) => {
  return dispatch => {
    const url = `/api/organizer/tournament/get-schedule/${id}`
    Api().get(url).then(function (response) {
      const apiResponse = response.data
      checkApiResponse(response, apiResponse, dispatch, () => {
        dispatch(updateSchedule(apiResponse.data))
      })

      return Promise.resolve()
    })
    .catch(function (error) {
      throw new SubmissionError({ _error: error.message })
    })
  }
}
