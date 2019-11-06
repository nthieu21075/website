import Navigator from 'helpers/history'
import { messageError } from 'services/organizers/message/actions'

export const checkApiResponse = (requestResponse, apiResponse, dispatch, callback, customResponse = null) => {
  if (requestResponse.status == 200) {
    switch(apiResponse.code) {
      case 401:
        Navigator.push('/login')
        break
      case 403:
        Navigator.push('/403')
        break;
      case 404:
        Navigator.push('/404')
        break;
      case 409:
        dispatch(messageError(apiResponse.message))
        break;
      case 400:
        customResponse()
        break;
      case 200:
        callback()
        break;
    }
  } else {
    Navigator.push('/500')
  }
}