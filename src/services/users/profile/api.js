import { userApi, userApiFormData } from 'global/apiConfig'
import { SubmissionError } from 'redux-form'
import { messageSuccess } from 'services/users/message/actions'
import { updateAuthData } from 'services/users/authentication/actions'
import { updateUserTeamData } from 'services/users/profile/userTeamActions'
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

export const createTeam =
  (values, dispatch, props) => {
    const { categoryId, name, logo } = values
    let bodyFormData = new FormData()
    bodyFormData.append('name', name)
    bodyFormData.append('categoryId', categoryId)

    if (logo) {
      bodyFormData.append('logo', logo.file)
    }

    userApiFormData().post('api/user/create-team', bodyFormData).then(function (response) {
      const apiResponse = response.data

      userCheckApiResponse(response, apiResponse, dispatch, () => {
        dispatch(reset('userCreateTeamForm'))
        dispatch(updateUserTeamData(apiResponse.data))
        dispatch(messageSuccess('Create team successfully'))
      })

      return Promise.resolve()
    })
    .catch(function (error) {
      console.log(error)
      throw new SubmissionError({ _error: error.message })
    })
  }


export const joinTournament = (tournamentId, teamId, callback) => {
  return dispatch => {
    userApi().post('/api/join-team', { tournamentId: tournamentId, teamId: teamId }).then(function (response) {
      const apiResponse = response.data

      userCheckApiResponse(response, apiResponse, dispatch, () => {
        callback()
        dispatch(updateUserTeamData(apiResponse.data))
        dispatch(messageSuccess('Join Tournament successfully. Please waiting organizer confirm!'))
      })

      return Promise.resolve()
    })
    .catch(function (error) {
      throw new SubmissionError({ _error: error.message })
    })
  }
}
