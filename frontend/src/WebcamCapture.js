import React from 'react';
import Webcam from "react-webcam";

class WebcamCapture extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageData: ""
    }
  }

  setRef = (webcam) => {
    this.webcam = webcam;
  }

  capture = () => {
    const imageData = this.webcam.getScreenshot();
    this.props.setImageDataAppState(imageData);
  }

  render () {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user"
    };

    return (
      <>
        <Webcam
          className="Webcam"
          height={400}
          width={400}
          audio={false}
          ref={this.setRef}
          screenshotFormat="image/jpeg"
          videoConstraints={videoConstraints}
        />
        <button onClick={this.capture}>Capture photo</button>
        <p>
          ImageData: {this.state.imageData}
        </p>
      </>
    )
  }
}

export default WebcamCapture;
