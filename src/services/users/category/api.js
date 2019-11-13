import { userApi } from 'global/apiConfig'
import { SubmissionError } from 'redux-form'
import { updateCategoryData } from './actions'
import { userCheckApiResponse } from 'helpers/apiResponse'

export const getCategories = () => {
  return dispatch => {
    userApi().get('api/categories').then(function (response) {
      const apiResponse = response.data

      userCheckApiResponse(response, apiResponse, dispatch, () => {
        dispatch(updateCategoryData(apiResponse.data.categories))
      })

      return Promise.resolve()
    })
    .catch(function (error) {
      throw new SubmissionError({ _error: error.message })
    })
  }
}