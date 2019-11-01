import { Api } from 'global/apiConfig'
import { SubmissionError } from 'redux-form'
import { updateCategoryData } from './actions'
import { messageError, messageSuccess } from 'services/organizers/message/actions'
import Navigator from 'helpers/history'

export const getCategories = () => {
  return dispatch => {
    Api().get('api/categories').then(function (response) {
      const apiResponse = response.data

      if (response.status == 200) {
        if (apiResponse.code != 200){
          dispatch(messageError(apiResponse.message))
        } else {
          dispatch(updateCategoryData(apiResponse.data.categories))
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