import axios from 'axios'
import { store } from 'stores/store/index'

export default () => {
  const apiToken = store.getState().authentication.apiToken

  return axios.create({
    baseURL: process.env.API_DOMAIN_URL,
    headers: {
      'x-access-token': apiToken
    }
  })
}