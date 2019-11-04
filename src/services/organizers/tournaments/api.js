import { ApiFormData } from 'global/apiConfig'
import { SubmissionError } from 'redux-form'
import { messageError, messageSuccess } from 'services/organizers/message/actions'
import { reset } from 'redux-form'

export const createTournament =
  (values, dispatch, props) => {
    const { name, categoryId, shortDescription, description, image, team, originationDate } = values
    let bodyFormData = new FormData()
    bodyFormData.append('name', name)
    bodyFormData.append('categoryId', categoryId)
    bodyFormData.append('shortDescription', shortDescription)
    bodyFormData.append('description', description)
    bodyFormData.append('team', team)
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
