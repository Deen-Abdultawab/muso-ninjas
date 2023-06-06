import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyAXicuUcw9MwKRL5QJpsRVOislQaqTPrfM",
  authDomain: "muso-nimjas.firebaseapp.com",
  projectId: "muso-nimjas",
  storageBucket: "muso-nimjas.appspot.com",
  messagingSenderId: "246870999712",
  appId: "1:246870999712:web:6e6c8e8f52a7eb469f7fc5"
};

firebase.initializeApp(firebaseConfig)
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const timestamp = firebase.firestore.FieldValue.serverTimestamp
const projectStorage = firebase.storage()

export { projectFirestore, projectAuth, timestamp, projectStorage}