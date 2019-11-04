import { Api } from 'global/apiConfig'
import { SubmissionError } from 'redux-form'
import { messageError, messageSuccess } from 'services/organizers/message/actions'
import { updateAuthData } from 'services/authentication/actions'
import Navigator from 'helpers/history'
import { reset } from 'redux-form'

export const updateProfile =
  (values, dispatch, props) => {
    const { email, address, location, name, organizerName, phoneNumber } = values
    const params = { email: email, address: address, location: location, name: name, organizerName: organizerName, phoneNumber: phoneNumber }

    Api().post('api/organizer/update-profile', params).then(function (response) {
      const apiResponse = response.data
      if (response.status == 200) {
        if (apiResponse.code != 200){
          dispatch(messageError(apiResponse.message))
        } else {
          dispatch(updateAuthData(apiResponse.data.user))
          dispatch(messageSuccess('Update profile successfully'))
        }
      } else {
        dispatch(messageError(response.statusText))
      }
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
      console.log(apiResponse)
      console.log(response)
      if (response.status == 200) {
        if (apiResponse.code != 200){
          dispatch(messageError(apiResponse.message))
        } else {
          dispatch(reset('origanizerChangePasswordForm'))
          dispatch(messageSuccess('Update password successfully'))
        }
      } else {
        dispatch(messageError(response.statusText))
      }
      return Promise.resolve()
    })
    .catch(function (error) {
      throw new SubmissionError({ _error: error.message })
    })
  }
