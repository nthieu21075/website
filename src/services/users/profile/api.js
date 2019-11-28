import { userApi } from 'global/apiConfig'
import { SubmissionError } from 'redux-form'
import { messageSuccess } from 'services/users/message/actions'
import { updateAuthData } from 'services/users/authentication/actions'
import Navigator from 'helpers/history'
import { reset } from 'redux-form'
import { userCheckApiResponse } from 'helpers/apiResponse'

export const updateProfile =
  (values, dispatch, props) => {
    const { email, address, location, name, organizerName, phoneNumber } = values
    const params = { email: email, address: address, location: location, name: name, phoneNumber: phoneNumber }

    userApi().post('api/user/update-profile', params).then(function (response) {
      const apiResponse = response.data

      userCheckApiResponse(response, apiResponse, dispatch, () => {
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

    userApi().post('api/user/update-password', params).then(function (response) {
      const apiResponse = response.data

      userCheckApiResponse(response, apiResponse, dispatch, () => {
        dispatch(reset('changePasswordForm'))
        dispatch(messageSuccess('Update password successfully'))
      })

      return Promise.resolve()
    })
    .catch(function (error) {
      console.log(error)
      throw new SubmissionError({ _error: error.message })
    })
  }
