import { Api } from 'global/apiConfig'
import { SubmissionError } from 'redux-form'
import { messageSuccess } from 'services/organizers/message/actions'
import { updateAuthData } from 'services/authentication/actions'
import Navigator from 'helpers/history'
import { reset } from 'redux-form'
import { checkApiResponse } from 'helpers/apiResponse'

export const updateProfile =
  (values, dispatch, props) => {
    const { email, address, location, name, organizerName, phoneNumber } = values
    const params = { email: email, address: address, location: location, name: name, organizerName: organizerName, phoneNumber: phoneNumber }

    Api().post('api/organizer/update-profile', params).then(function (response) {
      const apiResponse = response.data

      checkApiResponse(response, apiResponse, dispatch, () => {
        dispatch(updateAuthData(apiResponse.data.user))
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

    Api().post('api/organizer/update-password', params).then(function (response) {
      const apiResponse = response.data

      checkApiResponse(response, apiResponse, dispatch, () => {
        dispatch(reset('origanizerChangePasswordForm'))
        dispatch(messageSuccess('Update password successfully'))
      })

      return Promise.resolve()
    })
    .catch(function (error) {
      throw new SubmissionError({ _error: error.message })
    })
  }
