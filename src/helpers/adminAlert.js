import _ from 'lodash'
import { notification } from 'antd'
import { initMessageState } from 'services/admins/message/actions'

const errorAlert = (errors) => (dispatch) => {
    if (_.isObject(errors)) {
        _.mapKeys(errors, (value, key) => {
            notification['error']({ message: _.startCase(key) + ': ' + value })
            return
        })
    } else {
        notification['error']({ message: errors })
    }

    dispatch(initMessageState())
}

const successAlert = (messages) => (dispatch) => {
    if (_.isObject(messages)) {
        _.mapKeys(messages, (value, key) => {
            notification['success']({ message: _.startCase(key) + ': ' + value })
            return
        })
    } else {
        notification['success']({ message: messages })
    }

    dispatch(initMessageState())
}

export const showAlert = (props) => {
    const { message: { errors, success }, dispatch } = props

    if (errors) {
        console.log(123123123)
        dispatch(errorAlert(errors))
    }

    if (success) {
        dispatch(successAlert(success))
    }
}