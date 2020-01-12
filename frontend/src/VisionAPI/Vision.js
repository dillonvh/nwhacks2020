const vision = require("@google-cloud/vision");

async function getVisionAPIResults(base64ImageString) {
  // Creates a client
  const client = new vision.ImageAnnotatorClient();

  // Performs label detection on the image file
  const [result] = await client.faceDetection({
    image: { content: base64ImageString },
    features: [{ maxResults: 1, type: "FACE_DETECTION" }]
  });

  const faces = result.faceAnnotations;
  console.log("Labels:");
}

export default getVisionAPIResults;
