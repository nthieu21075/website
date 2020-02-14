import { store } from 'stores/store/index'
import { database } from './firebase'
import * as firebase from 'firebase'
import moment from 'moment'
import _ from 'lodash'



export const fetchOrganizerNotifications = (callback, showWebNotification) => (dispatch) => {
  const ref = database.ref('notifications/organizers/' + store.getState().organizers.auth.data.id)

  ref.on('child_added', (result) => {
    const item = result.val()
    showWebNotification(item, {
      title: 'You have new message',
      message: 'Your have new request to join' + item.tournamentName + ' from ' + item.userName
    })
  })

  ref.on('value', (result) => {
    if (result.val()) {
      callback(result.val())
    }
  })
}

export const fetchUserNotifications = (callback, showWebNotification) => (dispatch) => {
  const ref = database.ref('notifications/users/' + store.getState().users.auth.data.id)

  ref.on('child_added', (result) => {
    const item = result.val()
    showWebNotification(item, {
      title: 'You have new message',
      message: 'Your request to join ' + item.tournamentName +  ' was ' + item.status + ' by organizer'
    })
  })

  ref.on('value', (result) => {
    if (result.val()) {
      callback(result.val())
    }
  })
}

export const joinTournamentNotification = (item) => (dispatch) => {
  const user = store.getState().users.auth.data
  const id = firebase.database().ref('notifications/organizers/' + item.organizerId).push().key
  const ref = database.ref('notifications/organizers/' + item.organizerId).child(id)
  ref.set({
    id: id,
    tournamentName: item.tournamentName,
    time: moment().valueOf(),
    userName: user.name
  })
}

export const organizerResponseNotification = (item) => (dispatch) => {
  const id = firebase.database().ref('notifications/users/' + item.userId).push().key
  const ref = database.ref('notifications/users/' + item.userId).child(id)
  ref.set({
    id: id,
    tournamentName: item.tournamentName,
    time: moment().valueOf(),
    status: item.status
  })
}
