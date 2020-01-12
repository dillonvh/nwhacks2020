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

async function createSession(db) {
  const startTimestamp = moment().format("MMDDYYYY-HHmmss");
  const maxSessionId = await getMaxSessionId(db);
  console.log(maxSessionId);
  const newSessionId = parseInt(maxSessionId) + 1;
  const entryKey = "session" + newSessionId.toString();
  db.collection("sessions").doc(entryKey).set({
    sessionId: newSessionId,
    startTimestamp,
    endTimestamp: "",
    sessionData: {}
  });
  console.log("Session created!");
}

async function getMaxSessionId(db) {
  const sessionsRef = db.collection("sessions");
  let querySnapshot = await sessionsRef.orderBy("sessionId", "desc").limit(1).get();
  let queryDocsSnapshot = await querySnapshot.docs;
  let data = [];
  queryDocsSnapshot.forEach(doc => {
    data.push(doc.data());
    console.log(data);
  });
  if (data.length === 0) {
    return "0"
  } else {
    return data[0].sessionId;
  }
}

export default {
  initFirebase,
  createSession
}
