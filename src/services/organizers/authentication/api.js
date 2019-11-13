import { organierApi } from 'global/apiConfig'
import { SubmissionError } from 'redux-form'
import Navigator from 'helpers/history'
import { checkApiResponse } from 'helpers/apiResponse'

export const submitLogin =
  (values, dispatch, props) => {
    const { email, password } = values
    const params = { email: email, password: password }

    organierApi().post('api/organizer/login', params).then(function (response) {
      const apiResponse = response.data

      checkApiResponse(response, apiResponse, dispatch, () => {
        dispatch(authSuccess(apiResponse.data.user, apiResponse.token))
        Navigator.push('/')
      })

      return Promise.resolve()
    })
    .catch(function (error) {
      throw new SubmissionError({ _error: error.message })
    })
  }

export const submitRegister =
  (values, dispatch, props) => {
    const { email, password, name } = values
    const params = { name: name, email: email, password: password }

    organierApi().post('api/organizer/register', params).then(function (response) {
      const apiResponse = response.data

      checkApiResponse(response, apiResponse, dispatch, () => {
        dispatch(authSuccess(apiResponse.data.user, apiResponse.token))
        Navigator.push('/')
      })

      return Promise.resolve()
    })
    .catch(function (error) {
      throw new SubmissionError({ _error: error.message })
    })
  }
