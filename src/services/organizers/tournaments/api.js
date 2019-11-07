import { ApiFormData, Api } from 'global/apiConfig'
import { SubmissionError } from 'redux-form'
import { messageError, messageSuccess } from 'services/organizers/message/actions'
import { updateBasicInformation, updateTeamManagement, updateAvailableTeam, addTournamentTeam, removeTournamentTeam } from 'services/organizers/tournaments/actions'
import { reset } from 'redux-form'
import Navigator from 'helpers/history'
import { checkApiResponse } from 'helpers/apiResponse'

export const createTournament =
  (values, dispatch, props) => {
    const { name, categoryId, shortDescription, description, image, team, originationDate, publish } = values
    let bodyFormData = new FormData()
    bodyFormData.append('name', name)
    bodyFormData.append('categoryId', categoryId)
    bodyFormData.append('shortDescription', shortDescription)
    bodyFormData.append('description', description)
    bodyFormData.append('team', team)
    bodyFormData.append('publish', publish)
    bodyFormData.append('startDate', originationDate[0])
    bodyFormData.append('endDate', originationDate[1])
    if (image) {
      bodyFormData.append('image', image.file)
    }

    ApiFormData().post('api/organizer/tournament/create', bodyFormData).then(function (response) {
      const apiResponse = response.data

      checkApiResponse(response, apiResponse, dispatch, () => {
        dispatch(reset('origanizerCreateTournamentForm'))
        dispatch(messageSuccess('Create Tournament successfully'))
        Navigator.push('/organizer/tournament/' + apiResponse.data.id)
      })

      return Promise.resolve()
    })
    .catch(function (error) {
      throw new SubmissionError({ _error: error.message })
    })
  }

export const getBasicInformation = (id) => {
  return dispatch => {
    Api().get('api/organizer/tournament/basic-info/' + id).then(function (response) {
      const apiResponse = response.data

      checkApiResponse(response, apiResponse, dispatch, () => {
        dispatch(updateBasicInformation(apiResponse.data.basicInformation))
      }, () => {
        Navigator.push('/organizer/tournaments')
        dispatch(messageError(apiResponse.message))
      })

      return Promise.resolve()
    })
    .catch(function (error) {
      throw new SubmissionError({ _error: error.message })
    })
  }
}

export const getTeamManagement = (id) => {
  return dispatch => {
    Api().get('/api/organizer/tournament/team-management-info/' + id).then(function (response) {
      const apiResponse = response.data

      checkApiResponse(response, apiResponse, dispatch, () => {
        dispatch(updateTeamManagement(apiResponse.data))
      }, () => {
        Navigator.push('/organizer/tournaments')
        dispatch(messageError(apiResponse.message))
      })

      return Promise.resolve()
    })
    .catch(function (error) {
      throw new SubmissionError({ _error: error.message })
    })
  }
}

export const updateTournament =
  (values, dispatch, props) => {
    const { name, categoryId, shortDescription, description, image, team, originationDate, publish, teamOfTable } = values
    let bodyFormData = new FormData()

    bodyFormData.append('id', props.initialValues.id)
    bodyFormData.append('name', name)
    bodyFormData.append('categoryId', categoryId)
    bodyFormData.append('shortDescription', shortDescription)
    bodyFormData.append('description', description)
    bodyFormData.append('team', team)
    bodyFormData.append('teamOfTable', teamOfTable)
    bodyFormData.append('publish', publish)
    bodyFormData.append('startDate', originationDate[0])
    bodyFormData.append('endDate', originationDate[1])

    if (image) {
      if (image.file.status == 'removed') {
        bodyFormData.append('removeImage', true)
      } else {
        bodyFormData.append('image', image.file)
      }
    }

    ApiFormData().post('api/organizer/tournament/update', bodyFormData).then(function (response) {
      const apiResponse = response.data

      checkApiResponse(response, apiResponse, dispatch, () => {
        dispatch(messageSuccess('Update Tournament successfully'))
        dispatch(updateBasicInformation(apiResponse.data.basicInformation))
      })

      return Promise.resolve()
    })
    .catch(function (error) {
      throw new SubmissionError({ _error: error.message })
    })
  }

export const generateTable = (id) => {
  return dispatch => {
    Api().post('/api/organizer/tournament/generate-table', { id: id }).then(function (response) {
      const apiResponse = response.data

      checkApiResponse(response, apiResponse, dispatch, () => {
        dispatch(updateTeamManagement(apiResponse.data))
      }, () => {
        Navigator.push('/organizer/tournaments')
        dispatch(messageError(apiResponse.message))
      })

      return Promise.resolve()
    })
    .catch(function (error) {
      throw new SubmissionError({ _error: error.message })
    })
  }
}

export const getAvailbaleTeam = (categoryId, tournamentId) => {
  return dispatch => {
    const url = `/api/organizer/tournament/${tournamentId}/available-team/${categoryId}`
    Api().get(url).then(function (response) {
      const apiResponse = response.data

      checkApiResponse(response, apiResponse, dispatch, () => {
        dispatch(updateAvailableTeam(apiResponse.data))
      }, () => {
        Navigator.push('/organizer/tournaments')
        dispatch(messageError(apiResponse.message))
      })

      return Promise.resolve()
    })
    .catch(function (error) {
      throw new SubmissionError({ _error: error.message })
    })
  }
}

export const addTeam = (teamIds, tournamentId, callback) => {
  return dispatch => {
    Api().post('/api/organizer/tournament/add-team', { id: tournamentId, teamIds: teamIds }).then(function (response) {
      const apiResponse = response.data

      checkApiResponse(response, apiResponse, dispatch, () => {
        dispatch(addTournamentTeam(apiResponse.data))
        callback()
      }, () => {
        Navigator.push('/organizer/tournaments')
        dispatch(messageError(apiResponse.message))
      })

      return Promise.resolve()
    })
    .catch(function (error) {
      throw new SubmissionError({ _error: error.message })
    })
  }
}

export const removeTeam = (tournamentTeamIds, tournamentId, callback) => {
  return dispatch => {
    Api().post('/api/organizer/tournament/remove-team', { id: tournamentId, tournamentTeamIds: tournamentTeamIds }).then(function (response) {
      const apiResponse = response.data

      checkApiResponse(response, apiResponse, dispatch, () => {
        dispatch(removeTournamentTeam(tournamentTeamIds))
        callback()
      }, () => {
        Navigator.push('/organizer/tournaments')
        dispatch(messageError(apiResponse.message))
      })

      return Promise.resolve()
    })
    .catch(function (error) {
      throw new SubmissionError({ _error: error.message })
    })
  }
}

export const addToTeamTable = (tournamentId, teamIds, tableId, callback) => {
  return dispatch => {
    Api().post('/api/organizer/tournament/add-team-to-table', { id: tournamentId, teamIds: teamIds, tableId: tableId }).then(function (response) {
      const apiResponse = response.data

      checkApiResponse(response, apiResponse, dispatch, () => {
        dispatch(updateTeamManagement(apiResponse.data))
        callback()
      }, () => {
        Navigator.push('/organizer/tournaments')
        dispatch(messageError(apiResponse.message))
      })

      return Promise.resolve()
    })
    .catch(function (error) {
      throw new SubmissionError({ _error: error.message })
    })
  }
}

export const removeTeamTable = (tournamentId, tableResultId) => {
  return dispatch => {
    Api().post('/api/organizer/tournament/remove-team-to-table', { id: tournamentId, tableResultId: tableResultId }).then(function (response) {
      const apiResponse = response.data

      checkApiResponse(response, apiResponse, dispatch, () => {
        dispatch(updateTeamManagement(apiResponse.data))
      }, () => {
        Navigator.push('/organizer/tournaments')
        dispatch(messageError(apiResponse.message))
      })

      return Promise.resolve()
    })
    .catch(function (error) {
      throw new SubmissionError({ _error: error.message })
    })
  }
}
