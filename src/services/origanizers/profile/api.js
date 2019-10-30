import qs from 'qs'
import API from 'global/apiConfig'
import { SubmissionError } from 'redux-form'
import { authFail, updateAuthData } from 'services/authentication/actions'
import Navigator from 'helpers/history'
import { store, persistor } from 'stores/store/index'

export const submitUpdateProfile =
  (values, dispatch, props) => {
    const { email, address, location, name, organizerName, phoneNumber } = values
    const params = { email: email, address: address, location: location, name: name, organizerName: organizerName, phoneNumber: phoneNumber }

    API().post('api/origanizer/update-profile', params).then(function (response) {
      const apiResponse = response.data
      if (response.status == 200) {
        if (apiResponse.code != 200){
          dispatch(authFail(apiResponse.message))
        } else {
          dispatch(updateAuthData(apiResponse.data.user, 'Update successfully'))
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
