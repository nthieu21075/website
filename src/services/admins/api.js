import { messageError, messageSuccess } from 'services/admins/message/actions'
import { updateCategories } from 'services/admins/global/actions'
import { adminApi, adminApiFormData } from 'global/apiConfig'
import { SubmissionError } from 'redux-form'
import Navigator from 'helpers/history'
import { adminCheckApiResponse } from 'helpers/apiResponse'

export const getOrganizers = (callback) => {
  return dispatch => {
    adminApi().get('api/admins/organizers').then(function (response) {
      const apiResponse = response.data
      adminCheckApiResponse(response, apiResponse, dispatch, () => {
        callback(apiResponse.data)
      })

      return Promise.resolve()
    })
    .catch(function (error) {
      throw new SubmissionError({ _error: error.message })
    })
  }
}

export const getReferees = (callback) => {
  return dispatch => {
    adminApi().get('api/admins/referees').then(function (response) {
      const apiResponse = response.data
      adminCheckApiResponse(response, apiResponse, dispatch, () => {
        callback(apiResponse.data)
      })

      return Promise.resolve()
    })
    .catch(function (error) {
      throw new SubmissionError({ _error: error.message })
    })
  }
}

export const getManual = (callback) => {
  return dispatch => {
    adminApi().get('api/admins/manual').then(function (response) {
      const apiResponse = response.data
      adminCheckApiResponse(response, apiResponse, dispatch, () => {
        callback(apiResponse.data)
      })

      return Promise.resolve()
    })
    .catch(function (error) {
      throw new SubmissionError({ _error: error.message })
    })
  }
}

export const removeManual = (id, callback) => {
  return dispatch => {
    adminApi().get('api/admins/remove-manual/' + id).then(function (response) {
      const apiResponse = response.data
      adminCheckApiResponse(response, apiResponse, dispatch, () => {
        callback(apiResponse.data)
      })

      return Promise.resolve()
    })
    .catch(function (error) {
      throw new SubmissionError({ _error: error.message })
    })
  }
}

export const createOrganizer =
  (values, dispatch, props) => {
    const { email, address, location, name, organizerName, phoneNumber, password } = values
    const params = { email: email, address: address, location: location, name: name, organizerName: organizerName, phoneNumber: phoneNumber, password: password }

    adminApi().post('api/admins/create-organizer', params).then(function (response) {
      const apiResponse = response.data

      adminCheckApiResponse(response, apiResponse, dispatch, () => {
        Navigator.push('/admins/organizers')
        dispatch(messageSuccess('Created Organizer successfully'))
      })

      return Promise.resolve()
    })
    .catch(function (error) {
      throw new SubmissionError({ _error: error.message })
    })
  }

export const createReferee =
  (values, dispatch, props) => {
    const { email, address, location, name, phoneNumber, password, price, categoryId } = values
    const params = { email: email, address: address, location: location, name: name, phoneNumber: phoneNumber, password: password, price: price, categoryId: categoryId }

    adminApi().post('api/admins/create-referee', params).then(function (response) {
      const apiResponse = response.data

      adminCheckApiResponse(response, apiResponse, dispatch, () => {
        Navigator.push('/admins/referees')
        dispatch(messageSuccess('Created Referee successfully'))
      })

      return Promise.resolve()
    })
    .catch(function (error) {
      throw new SubmissionError({ _error: error.message })
    })
  }

export const createPitch =
  (values, dispatch, props) => {
    const { name, categoryId, ownerName, phoneNumber, image, price, location, address } = values

    let bodyFormData = new FormData()
    bodyFormData.append('name', name)
    bodyFormData.append('categoryId', categoryId)
    bodyFormData.append('ownerName', ownerName)
    bodyFormData.append('phoneNumber', phoneNumber)
    bodyFormData.append('price', price)
    bodyFormData.append('address', address)
    bodyFormData.append('location', location)
    if (image) {
      bodyFormData.append('image', image.file)
    }

    adminApiFormData().post('api/admins/create-pitch', bodyFormData).then(function (response) {
      const apiResponse = response.data

      adminCheckApiResponse(response, apiResponse, dispatch, () => {
        Navigator.push('/admins/pitches')
        dispatch(messageSuccess('Created Pitch successfully'))
      })

      return Promise.resolve()
    })
    .catch(function (error) {
      throw new SubmissionError({ _error: error.message })
    })
  }

export const getCategories = () => {
  return dispatch => {
    adminApi().get('api/categories').then(function (response) {
      const apiResponse = response.data
      adminCheckApiResponse(response, apiResponse, dispatch, () => {
        dispatch(updateCategories(apiResponse.data.categories))
      })

      return Promise.resolve()
    })
    .catch(function (error) {
      throw new SubmissionError({ _error: error.message })
    })
  }
}

export const getPitches = (callback) => {
  return dispatch => {
    adminApi().get('api/admins/pitches').then(function (response) {
      const apiResponse = response.data
      adminCheckApiResponse(response, apiResponse, dispatch, () => {
        callback(apiResponse.data)
      })

      return Promise.resolve()
    })
    .catch(function (error) {
      throw new SubmissionError({ _error: error.message })
    })
  }
}

export const getPrivateCategories = (callback) => {
  return dispatch => {
    adminApi().get('api/admins/categories').then(function (response) {
      const apiResponse = response.data
      adminCheckApiResponse(response, apiResponse, dispatch, () => {
        callback(apiResponse.data)
      })

      return Promise.resolve()
    })
    .catch(function (error) {
      throw new SubmissionError({ _error: error.message })
    })
  }
}

export const createCategory =
  (values, dispatch, props) => {
    const { name, image } = values

    let bodyFormData = new FormData()
    bodyFormData.append('name', name)
    if (image) {
      bodyFormData.append('image', image.file)
    }

    adminApiFormData().post('api/admins/create-category', bodyFormData).then(function (response) {
      const apiResponse = response.data

      adminCheckApiResponse(response, apiResponse, dispatch, () => {
        Navigator.push('/admins/categories')
        dispatch(messageSuccess('Created Category successfully'))
      })

      return Promise.resolve()
    })
    .catch(function (error) {
      throw new SubmissionError({ _error: error.message })
    })
  }
