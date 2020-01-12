const auth = require("google-auth-library");
const vision = require("@google-cloud/vision");

async function getVisionAPIResults(base64ImageString) {
  const response = await fetch(
    "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyDhXuoXmqXVRD9IEhqKKK_SPt77A68Ajgs",
    {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json"
      },
      body: JSON.stringify({
        requests: [
          {
            image: {
              content: base64ImageString
            },
            features: [
              {
                maxResults: 1,
                type: "FACE_DETECTION"
              }
            ]
          }
        ]
      })
    }
  );

  const data = await response.json();

  const face = data.responses[0].faceAnnotations[0];

  const faceData = {
    midpointHeight: face.landmarks[6].position.y,
    joy: face.joyLikelihood,
    sorrow: face.sorrowLikelihood,
    anger: face.angerLikelihood,
    surprise: face.surpriseLikelihood
  };

  return faceData;
}

export default getVisionAPIResults;
