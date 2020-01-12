const firebase = require("firebase");
require("firebase/firestore");

const moment = require("moment");

function initFirebase() {
  firebase.initializeApp({
    apiKey: "AIzaSyAkt46-EZ5hRGmoVN0NOTyvwo6CpRCeZPI",
    authDomain: "genuine-grid-264821.firebaseapp.com",
    projectId: "genuine-grid-264821"
  });
  console.log("Firebase initiated");
  return firebase.firestore();
}

function createSession(db) {
  const startTimestamp = moment().format("MMDDYYYY-HHmmss");
  getMaxSessionId(db);
  db.collection("sessions").doc("1").set({
    startTimestamp,
    endTimestamp: "",
    sessionData: {}
  });
  console.log("Session created!");
}

function getMaxSessionId(db) {
  let query = db.collection("sessions").orderBy("sessionId");
  console.log(query);
  // if (!maxSessionId) {
  //   maxSessionId = 0;
  // }
  // return maxSessionId;
}

export default {
  initFirebase,
  createSession
}
