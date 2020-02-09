import { refereeApi } from 'global/apiConfig'
import { SubmissionError } from 'redux-form'
import Navigator from 'helpers/history'
import { refereeCheckApiResponse } from 'helpers/apiResponse'
import { authSuccess } from 'services/referees/authentication/actions'

export const submitLogin =
  (values, dispatch, props) => {
    const { email, password } = values
    const params = { email: email, password: password }

    refereeApi().post('api/referee/login', params).then(function (response) {
      const apiResponse = response.data

      refereeCheckApiResponse(response, apiResponse, dispatch, () => {
        dispatch(authSuccess(apiResponse.data.user, apiResponse.token))
        Navigator.push('/referee/invited-match')
      })

      return Promise.resolve()
    })
    .catch(function (error) {
      throw new SubmissionError({ _error: error.message })
    })
  }