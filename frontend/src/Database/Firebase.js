import getVisionAPIResults from "../VisionAPI/Vision";

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

// Creates a new session with an empty sessionData array
async function createSession(db, initialSessionData) {
  const startTimestamp = moment().format("YYYY-MM-DD HH:mm:ss");
  const maxSessionId = await getMaxSessionId(db);
  const newSessionId = parseInt(maxSessionId) + 1;
  const entryKey = "session" + newSessionId.toString();
  db.collection("sessions").doc(entryKey).set({
    sessionId: newSessionId,
    startTimestamp,
    endTimestamp: "",
    initialSessionData,
    sessionData: []
  });
  console.log("Session created!", newSessionId);
  return newSessionId;
}

// Ends a session by writing the endTimestamp to the session
async function endSession(db, sessionId) {
  const endTimestamp = moment().format("YYYY-MM-DD HH:mm:ss");
  const sessionIdEntryKey = "session" + sessionId.toString();
  const sessionsRef = db.collection("sessions");
  const startTimestampQuery = await sessionsRef.doc(sessionIdEntryKey).get();
  const startTimestamp = startTimestampQuery.data().startTimestamp;
  const totalSessionTime = moment(endTimestamp).diff(startTimestamp, 'seconds');
  sessionsRef.doc(sessionIdEntryKey).update({
    endTimestamp,
    totalSessionTime
  });
}

// Gets the max session id, necessary for adding new sessions
async function getMaxSessionId(db) {
  const sessionsRef = db.collection("sessions");
  const querySnapshot = await sessionsRef.orderBy("sessionId", "desc").limit(1).get();
  const queryDocsSnapshot = await querySnapshot.docs;
  const data = [];
  queryDocsSnapshot.forEach(doc => {
    data.push(doc.data());
  });
  if (data.length === 0) {
    return "0"
  } else {
    return data[0].sessionId;
  }
}

// Fetches the Google Cloud Vision API data for the given image,
// then writes the image and API data to the given sessionData array
async function writeSessionData(db, base64ImageString, sessionId) {
  const sessionsRef = db.collection('sessions');
  const sessionIdEntryKey = "session" + sessionId.toString();
  const sessionDoc = await sessionsRef.doc(sessionIdEntryKey).get();
  const sessionData = Array.from(sessionDoc.data().sessionData);
  // Get the image vision API data
  const visionAPIData = await getVisionAPIResults(base64ImageString);
  console.log("visionAPIData: ", visionAPIData);
  sessionData.push({
    base64ImageString,
    visionAPIData
  });

  sessionsRef.doc(sessionIdEntryKey).update({
    sessionData
  });
  console.log("Wrote data to session", sessionId);
}

async function getAllSessions(db) {
  const allSessionsSnapshot = await db.collection("sessions").get();
  return allSessionsSnapshot.docs.map(doc => {return doc.data()});
}

// Get the sessionData array for a session
async function getSession(db, sessionId) {
  const sessionsRef = db.collection("sessions");
  const sessionIdEntryKey = "session" + sessionId.toString();
  const sessionDoc = await sessionsRef.doc(sessionIdEntryKey).get();
  return sessionDoc.data();
}

export default {
  initFirebase,
  createSession,
  endSession,
  writeSessionData,
  getSession,
  getAllSessions
}
