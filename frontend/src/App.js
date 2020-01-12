import React from "react";
import "./App.css";
import Button from "@material-ui/core/Button";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import WebcamCapture from "./WebcamCapture";
import dbFunctions from "./Database/Firebase";
import getVisionAPIResults from "./VisionAPI/Vision";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageData: "",
      db: null,
      sessionLive: false
    };
  }

  componentDidMount() {
    // Initialize the database connection here
    const db = dbFunctions.initFirebase();
    this.setState({
      db
    });
  }

  setImageDataAppState = imageData => {
    this.setState({
      imageData
    });
  };

  handleStartSessionClick = () => {
    this.setState({
      sessionLive: !this.state.sessionLive
    });
    dbFunctions.createSession(this.state.db);
  };

  handleStopSessionClick = () => {
    this.setState({
      sessionLive: !this.state.sessionLive
    });
  };

  getVisionData = async () => {
    const faceData = await getVisionAPIResults(this.state.imageData);
  };

  render() {
    let sessionButtonJSX = null;
    let webcamCaptureJSX = null;

    if (this.state.sessionLive) {
      webcamCaptureJSX = (
        <WebcamCapture setImageDataAppState={this.setImageDataAppState} />
      );
      sessionButtonJSX = (
        <Button
          onClick={this.handleStopSessionClick}
          variant="contained"
          color="primary"
          size="large"
        >
          Stop Session &nbsp;
        </Button>
      );
    } else {
      sessionButtonJSX = (
        <Button
          onClick={this.handleStartSessionClick}
          variant="contained"
          color="primary"
          size="large"
        >
          Start Session &nbsp;
          <PlayCircleOutlineIcon />
        </Button>
      );
    }

    return (
      <div className="App">
        <div className="Main">
          <h1>HackerHelper</h1>
          {sessionButtonJSX}
          {webcamCaptureJSX}
        </div>
      </div>
    );
  }
}

export default App;
