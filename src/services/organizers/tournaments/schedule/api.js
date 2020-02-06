import { organierApi } from 'global/apiConfig'
import { SubmissionError } from 'redux-form'
import { updateSchedule } from 'services/organizers/tournaments/actions'
import { checkApiResponse } from 'helpers/apiResponse'
import { loadingTourmanetState } from 'services/organizers/tournaments/actions'
import { messageError, messageSuccess } from 'services/organizers/message/actions'

export const getSchedule = (id) => {
  return dispatch => {
    const url = `/api/organizer/tournament/get-schedule/${id}`
    organierApi().get(url).then(function (response) {
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

export const generate =
  (values, dispatch, props) => {
    const { scheduleType } = values

    dispatch(loadingTourmanetState())
    organierApi().post('/api/organizer/tournament/generate-schedule', { id: props.initialValues.id, scheduleType: scheduleType }).then(function (response) {
      const apiResponse = response.data

      checkApiResponse(response, apiResponse, dispatch, () => {
        dispatch(messageSuccess('Generate Schedule successfully'))
        dispatch(updateSchedule(apiResponse.data))
      })

      return Promise.resolve()
    })
    .catch(function (error) {
      throw new SubmissionError({ _error: error.message })
    })
  }


export const updateMatchInfo = (params, callback) => {
  return dispatch => {
    organierApi().post('/api/organizer/tournament/update-match-info', params).then(function (response) {
      const apiResponse = response.data

      checkApiResponse(response, apiResponse, dispatch, () => {
        callback()
        dispatch(updateSchedule(apiResponse.data))
      })

      return Promise.resolve()
    })
    .catch(function (error) {
      throw new SubmissionError({ _error: error.message })
    })
  }
}