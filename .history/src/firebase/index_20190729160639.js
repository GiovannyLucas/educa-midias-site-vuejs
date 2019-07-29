import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage'
import 'firebase/database'

export const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyAeLSaUVJHx20UIrZZby1lGErCH2nsvJhc',
  authDomain: 'site-educa-midias.firebaseapp.com',
  databaseURL: 'https://site-educa-midias.firebaseio.com',
  projectId: 'site-educa-midias',
  storageBucket: 'site-educa-midias.appspot.com',
  messagingSenderId: '22958374209',
  appId: '1:22958374209:web:055dd942ce2f47d4'
})

export default function install (Vue) {
  Object.defineProperty(Vue.prototype, '$firebase', {
    get () {
      return firebaseApp
    }
  })
}
