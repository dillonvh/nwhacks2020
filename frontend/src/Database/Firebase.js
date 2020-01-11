const firebase = require('firebase');
require('firebase/firestore');

let db;

function initFirebase() {
  firebase.initializeApp({
    apiKey: 'AIzaSyAkt46-EZ5hRGmoVN0NOTyvwo6CpRCeZPI',
    authDomain: 'genuine-grid-264821.firebaseapp.com',
    projectId: 'genuine-grid-264821'
  });

  db = firebase.firestore();
}