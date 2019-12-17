import { userApi } from 'global/apiConfig'
import { SubmissionError } from 'redux-form'
import Navigator from 'helpers/history'
import { userCheckApiResponse } from 'helpers/apiResponse'
import { authSuccess } from 'services/users/authentication/actions'
import { updateUserTeamData } from 'services/users/profile/userTeamActions'

export const submitLogin =
  (values, dispatch, props) => {
    const { email, password } = values
    const params = { email: email, password: password }

    userApi().post('api/user/login', params).then(function (response) {
      const apiResponse = response.data

      userCheckApiResponse(response, apiResponse, dispatch, () => {
        console.log(apiResponse.data)
        dispatch(authSuccess(apiResponse.data.user, apiResponse.token))
        dispatch(updateUserTeamData({team: apiResponse.data.team, tournamentTeam: apiResponse.data.tournamentTeam}))

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

    userApi().post('api/user/register', params).then(function (response) {
      const apiResponse = response.data

      userCheckApiResponse(response, apiResponse, dispatch, () => {
        dispatch(authSuccess(apiResponse.data.user, apiResponse.token))
        Navigator.push('/')
      })

      return Promise.resolve()
    })
    .catch(function (error) {
      throw new SubmissionError({ _error: error.message })
    })
  }
