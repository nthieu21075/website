import { adminApi } from 'global/apiConfig'
import { SubmissionError } from 'redux-form'
import Navigator from 'helpers/history'
import { adminCheckApiResponse } from 'helpers/apiResponse'
import { authSuccess } from 'services/admins/authentication/actions'

export const submitLogin =
  (values, dispatch, props) => {
    const { email, password } = values
    const params = { email: email, password: password }

    adminApi().post('api/admin/login', params).then(function (response) {
      const apiResponse = response.data

      adminCheckApiResponse(response, apiResponse, dispatch, () => {
        dispatch(authSuccess(apiResponse.data.user, apiResponse.token))
        Navigator.push('/admins/organizers')
      })

      return Promise.resolve()
    })
    .catch(function (error) {
      throw new SubmissionError({ _error: error.message })
    })
  }