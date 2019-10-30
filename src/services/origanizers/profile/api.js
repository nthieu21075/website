import qs from 'qs'
import API from 'global/apiConfig'
import { SubmissionError } from 'redux-form'
import { authFail, updateAuthData, updateMsg } from 'services/authentication/actions'
import Navigator from 'helpers/history'
import { store, persistor } from 'stores/store/index'
import { reset } from 'redux-form'

export const updateProfile =
  (values, dispatch, props) => {
    const { email, address, location, name, organizerName, phoneNumber } = values
    const params = { email: email, address: address, location: location, name: name, organizerName: organizerName, phoneNumber: phoneNumber }

    API().post('api/origanizer/update-profile', params).then(function (response) {
      const apiResponse = response.data
      if (response.status == 200) {
        if (apiResponse.code != 200){
          dispatch(authFail(apiResponse.message))
        } else {
          dispatch(updateAuthData(apiResponse.data.user))
          dispatch(updateMsg('Update profile successfully'))
        }
      } else {
        dispatch(authFail({ error: response.statusText }))
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

    API().post('api/origanizer/update-password', params).then(function (response) {
      const apiResponse = response.data
      console.log(apiResponse)
      console.log(response)
      if (response.status == 200) {
        if (apiResponse.code != 200){
          dispatch(authFail(apiResponse.message))
        } else {
          dispatch(reset('origanizerChangePasswordForm'))
          dispatch(updateMsg('Update password successfully'))
        }
      } else {
        dispatch(authFail({ error: response.statusText }))
      }
      return Promise.resolve()
    })
    .catch(function (error) {
      throw new SubmissionError({ _error: error.message })
    })
  }
