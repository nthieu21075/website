import axios from 'axios'
import { store } from 'stores/store/index'

export const userApi = () => {
  const apiToken = store.getState().users.auth.apiToken

  return axios.create({
    baseURL: process.env.API_DOMAIN_URL,
    headers: {
      'x-access-token': apiToken
    }
  })
}

export const userApiFormData = () => {
  const apiToken = store.getState().users.auth.apiToken

  return axios.create({
    baseURL: process.env.API_DOMAIN_URL,
    headers: {
      'x-access-token': apiToken,
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const organierApi = (type) => {
  const apiToken = store.getState().organizers.auth.apiToken

  return axios.create({
    baseURL: process.env.API_DOMAIN_URL,
    headers: {
      'x-access-token': apiToken
    }
  })
}

export const organierApiFormData = () => {
  const apiToken = store.getState().organizers.auth.apiToken

  return axios.create({
    baseURL: process.env.API_DOMAIN_URL,
    headers: {
      'x-access-token': apiToken,
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const adminApi = () => {
  const apiToken = store.getState().admins.auth.apiToken

  return axios.create({
    baseURL: process.env.API_DOMAIN_URL,
    headers: {
      'x-access-token': apiToken
    }
  })
}

export const adminApiFormData = () => {
  const apiToken = store.getState().admins.auth.apiToken

  return axios.create({
    baseURL: process.env.API_DOMAIN_URL,
    headers: {
      'x-access-token': apiToken,
      'Content-Type': 'multipart/form-data'
    }
  })
}

export const refereeApi = () => {
  const apiToken = store.getState().referee.auth.apiToken

  return axios.create({
    baseURL: process.env.API_DOMAIN_URL,
    headers: {
      'x-access-token': apiToken
    }
  })
}

export const refereeApiFormData = () => {
  const apiToken = store.getState().referee.auth.apiToken

  return axios.create({
    baseURL: process.env.API_DOMAIN_URL,
    headers: {
      'x-access-token': apiToken,
      'Content-Type': 'multipart/form-data'
    }
  })
}