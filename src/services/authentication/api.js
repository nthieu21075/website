import API from 'global/apiConfig'
import { SubmissionError } from 'redux-form'
import { authFail, authSuccess } from './actions'
import Navigator from 'helpers/history'
const qs = require('qs')

export const submitLogin =
  (values, dispatch, props) => {
    const { email, password } = values
    const params = { email: email, password: password }

    API().post('api/login', qs.stringify(params)).then(function (response) {
      const apiResponse = response.data

      if (response.status == 200) {
        if (apiResponse.code != 200){
          dispatch(authFail(apiResponse.message))
        } else {
          dispatch(authSuccess(apiResponse.data.user, apiResponse.token))

          if (apiResponse.data.user.type == 'normal'){
            Navigator.push('/')
          } else if (apiResponse.data.user.type == 'organizer'){
            Navigator.push('/organizer')
          }
        }
      } else {
        dispatch(authFail({ error: response.statusText }))
      }
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

    API().post('api/register', qs.stringify(params)).then(function (response) {
      const apiResponse = response.data

      if (response.status == 200) {
        if (apiResponse.code != 200){
          dispatch(authFail(apiResponse.message))
        } else {
          console.log(apiResponse.data.user)
          dispatch(authSuccess(apiResponse.data.user))
          Navigator.push('/')
        }
      } else {
        dispatch(authFail({ error: response.statusText }))
      }
      return Promise.resolve()
    })
    .catch(function (error) {
      throw new SubmissionError({ _error: error.message })
    })
  }
