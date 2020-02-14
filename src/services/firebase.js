import * as firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyC9Q5ZbL_DAKsRQ77wBkxLuXtUeUi4gpW8',
  authDomain: 'tournament-32353.firebaseio.com',
  databaseURL: 'https://tournament-32353.firebaseio.com/',
  projectId: 'tournament-32353',
  storageBucket: '',
  messagingSenderId: '505891397863'
}

export const firebaseApp = firebase.initializeApp(config)

export const database = firebaseApp.database()

export const firebaseAuth = firebaseApp.auth()

export const timestamp = firebase.database.ServerValue.TIMESTAMP
