import Navigator from 'helpers/history'
import { messageError } from 'services/organizers/message/actions'
import { messageError as userMessageError } from 'services/users/message/actions'

import { messageError as adminMessageError } from 'services/admins/message/actions'

export const checkApiResponse = (requestResponse, apiResponse, dispatch, callback, customResponse = null) => {
    if (requestResponse.status == 200) {
        switch (apiResponse.code) {
            case 401:
                dispatch(messageError(apiResponse.message))
                Navigator.push('/organizer/login')
                break
            case 403:
                Navigator.push('/organizer/403')
                break;
            case 404:
                Navigator.push('/organizer/404')
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
        Navigator.push('/organizer/500')
    }
}

export const adminCheckApiResponse = (requestResponse, apiResponse, dispatch, callback, customResponse = null) => {
    if (requestResponse.status == 200) {
        switch (apiResponse.code) {
            case 401:
                dispatch(adminMessageError(apiResponse.message))
                Navigator.push('/admins/login')
                break
            case 403:
                Navigator.push('/admins/403')
                break;
            case 404:
                Navigator.push('/admins/404')
                break;
            case 409:
                dispatch(adminMessageError(apiResponse.message))
                break;
            case 400:
                customResponse()
                break;
            case 200:
                callback()
                break;
        }
    } else {
        Navigator.push('/admins/500')
    }
}

export const userCheckApiResponse = (requestResponse, apiResponse, dispatch, callback, customResponse = null) => {
    if (requestResponse.status == 200) {
        switch (apiResponse.code) {
            case 401:
                dispatch(userMessageError(apiResponse.message))
                Navigator.push('/login')
                break
            case 403:
                Navigator.push('/403')
                break;
            case 404:
                Navigator.push('/404')
                break;
            case 409:
                dispatch(userMessageError(apiResponse.message))
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