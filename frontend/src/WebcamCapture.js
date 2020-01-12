import React from "react";
import Webcam from "react-webcam";
import ReactInterval from "react-interval";
import dbFunctions from './Database/Firebase';

class WebcamCapture extends React.Component {
  constructor(props) {
    super(props);
  }

  setRef = webcam => {
    this.webcam = webcam;
  };

  capture = () => {
    // Do we need to check if the session is live here?
    const imageData = this.webcam.getScreenshot().slice(23);
    this.props.setImageDataAppState(imageData);
    console.log(imageData);
    dbFunctions.writeSessionData(this.props.db, imageData, this.props.sessionId);
  };

  render() {
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
        <ReactInterval timeout={10000} enabled={true} callback={this.capture} />
      </>
    );
  }
}

export default WebcamCapture;
