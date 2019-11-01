import axios from 'axios'
import { store } from 'stores/store/index'

export const Api = () => {
  const apiToken = store.getState().authentication.apiToken

  return axios.create({
    baseURL: process.env.API_DOMAIN_URL,
    headers: {
      'x-access-token': apiToken
    }
  })
}

export const ApiFormData = () => {
  const apiToken = store.getState().authentication.apiToken

  return axios.create({
    baseURL: process.env.API_DOMAIN_URL,
    headers: {
      'x-access-token': apiToken,
      'Content-Type': 'multipart/form-data'
    }
  })
}