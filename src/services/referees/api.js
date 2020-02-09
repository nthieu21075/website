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

export const getProfileDetail = (callback) => {
  return dispatch => {
    refereeApi().get('/api/referee/profile-detail').then(function (response) {
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


export const updateProfile =
  (values, dispatch, props) => {
    const { email, address, location, name, phoneNumber } = values
    const params = { email: email, address: address, location: location, name: name, phoneNumber: phoneNumber }

    refereeApi().post('api/referee/update-profile', params).then(function (response) {
      const apiResponse = response.data

      refereeCheckApiResponse(response, apiResponse, dispatch, () => {
        Navigator.push('/referee/my-profile')
        dispatch(messageSuccess('Update profile successfully'))
      })

      return Promise.resolve()
    })
    .catch(function (error) {
      throw new SubmissionError({ _error: error.message })
    })
  }

export const updatePassword =
  (values, dispatch, props) => {
    const { currentPassword, newPassword } = values
    const params = { currentPassword: currentPassword, newPassword: newPassword }

    refereeApi().post('api/referee/update-password', params).then(function (response) {
      const apiResponse = response.data

      refereeCheckApiResponse(response, apiResponse, dispatch, () => {
        Navigator.push('/referee/my-profile')
        dispatch(messageSuccess('Update password successfully'))
      })

      return Promise.resolve()
    })
    .catch(function (error) {
      throw new SubmissionError({ _error: error.message })
    })
  }
