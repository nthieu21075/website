import { userApi } from 'global/apiConfig'
import { SubmissionError } from 'redux-form'
import { updateRecommendTournament, updateTournament } from './actions'
import { userCheckApiResponse } from 'helpers/apiResponse'
import { updateUserTeamData } from 'services/users/profile/userTeamActions'

export const getTournaments = (id) => {
  return dispatch => {
    userApi().get(`/api/user/tournaments/${id}`).then(function (response) {
      const apiResponse = response.data

      userCheckApiResponse(response, apiResponse, dispatch, () => {
        if (id == 'recomended') {
          dispatch(updateRecommendTournament(apiResponse.data))
        } else {
          dispatch(updateTournament(apiResponse.data))
        }
      })

      return Promise.resolve()
    })
    .catch(function (error) {
      throw new SubmissionError({ _error: error.message })
    })
  }
}

export const userTeam = () => {
  return dispatch => {
    userApi().get(`/api/user/team`).then(function (response) {
      const apiResponse = response.data

      userCheckApiResponse(response, apiResponse, dispatch, () => {
        dispatch(updateUserTeamData(apiResponse.data))
      })

      return Promise.resolve()
    })
    .catch(function (error) {
      throw new SubmissionError({ _error: error.message })
    })
  }
}

export const getTournamentDetail = (tournamentId, callback) => {
  return dispatch => {
    userApi().get(`/api/user/tournament-detail/${tournamentId}`).then(function (response) {
      const apiResponse = response.data

      userCheckApiResponse(response, apiResponse, dispatch, () => {
        callback(apiResponse.data)
      })

      return Promise.resolve()
    })
    .catch(function (error) {
      throw new SubmissionError({ _error: error.message })
    })
  }
}

export const searchTourmanent = (keyword, callback) => {
  return dispatch => {
    userApi().get(`/api/user/search-tournament/${keyword}`).then(function (response) {
      const apiResponse = response.data

      userCheckApiResponse(response, apiResponse, dispatch, () => {
        callback(apiResponse.data)
      })

      return Promise.resolve()
    })
    .catch(function (error) {
      throw new SubmissionError({ _error: error.message })
    })
  }
}