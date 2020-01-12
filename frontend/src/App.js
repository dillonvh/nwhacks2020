import React from "react";
import Webcam from "react-webcam";
import "./App.css";
import Button from "@material-ui/core/Button";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import WebcamCapture from "./WebcamCapture";
import initFirebase from "./Database/Firebase";
import getVisionAPIResults from "./VisionAPI/Vision";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageData: ""
    };
  }

  componentDidMount() {
    // Initialize the database connection here
    const db = initFirebase();
  }

  setImageDataAppState = imageData => {
    this.setState({
      imageData
    });
  };

  render() {
    return (
      <div className="App">
        <div className="Main">
          <h1>HackerHelper</h1>
          <Button variant="contained" color="primary" size="large">
            Start Session &nbsp;
            <PlayCircleOutlineIcon />
          </Button>
          <WebcamCapture setImageDataAppState={this.setImageDataAppState} />
        </div>
      </div>
    );
  }

  startSession = () => {
    // Start the session by writing to firebase
  };
}

export default App;
