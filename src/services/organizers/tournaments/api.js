import { ApiFormData, Api } from 'global/apiConfig'
import { SubmissionError } from 'redux-form'
import { messageError, messageSuccess } from 'services/organizers/message/actions'
import { updateBasicInformation } from 'services/organizers/tournaments/actions'
import { reset } from 'redux-form'
import Navigator from 'helpers/history'

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

      if (response.status == 200) {
        if (apiResponse.code != 200){
          dispatch(messageError(apiResponse.message))
        } else {
          dispatch(reset('origanizerCreateTournamentForm'))
          dispatch(messageSuccess('Create Tournament successfully'))
          Navigator.push('/organizer/tournament/' + apiResponse.data.id)
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

export const getTournament = (id) => {
  return dispatch => {
    Api().get('api/organizer/tournament/' + id).then(function (response) {
      const apiResponse = response.data

      if (response.status == 200) {
        if (apiResponse.code == 400){
          Navigator.push('/organizer/tournamens')
          dispatch(messageError(apiResponse.message))
        } else if (apiResponse.code == 200){
          dispatch(updateBasicInformation(apiResponse.data.basicInformation))
        } else {
          dispatch(messageError(apiResponse.message))
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
}

export const updateTournament =
  (values, dispatch, props) => {
    const { name, categoryId, shortDescription, description, image, team, originationDate, publish } = values
    let bodyFormData = new FormData()

    bodyFormData.append('id', props.initialValues.id)
    bodyFormData.append('name', name)
    bodyFormData.append('categoryId', categoryId)
    bodyFormData.append('shortDescription', shortDescription)
    bodyFormData.append('description', description)
    bodyFormData.append('team', team)
    bodyFormData.append('publish', publish)
    bodyFormData.append('startDate', originationDate[0])
    bodyFormData.append('endDate', originationDate[1])
    console.log(image)
    if (image) {
      if (image.file.status == 'removed') {
        bodyFormData.append('removeImage', true)
      } else {
        bodyFormData.append('image', image.file)
      }
    }

    ApiFormData().post('api/organizer/tournament/update', bodyFormData).then(function (response) {
      const apiResponse = response.data
      console.log(response)
      if (response.status == 200) {
        if (apiResponse.code != 200){
          dispatch(messageError(apiResponse.message))
        } else {
          dispatch(messageSuccess('Update Tournament successfully'))
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