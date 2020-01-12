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

  try {
    const face = data.responses[0].faceAnnotations[0];
    const faceData = {
      noseHeight: face.landmarks[7].position.y,
      joy: face.joyLikelihood,
      sorrow: face.sorrowLikelihood,
      anger: face.angerLikelihood,
      surprise: face.surpriseLikelihood
    };

    return faceData;
  } catch (e) {
    return {};
  }
}

export default getVisionAPIResults;
