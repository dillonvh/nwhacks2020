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
<<<<<<< Updated upstream
      db: null,
=======
>>>>>>> Stashed changes
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

  handleSessionClick = () => {
    this.setState({
      sessionLive: !this.state.sessionLive
    });
  }

  render() {
    let sessionButtonJSX = null;
    let webcamCaptureJSX = null;

    if (this.state.sessionLive) {
      webcamCaptureJSX = <WebcamCapture setImageDataAppState={this.setImageDataAppState} />;
      sessionButtonJSX = <Button onClick={this.handleSessionClick} variant="contained" color="primary" size="large">
        Stop Session &nbsp;
      </Button>;
    } else {
      sessionButtonJSX = <Button onClick={this.handleSessionClick} variant="contained" color="primary" size="large">
        Start Session &nbsp;
        <PlayCircleOutlineIcon />
      </Button>;
    }

    return (
      <div className="App">
        <div className="Main">
          <h1>HackerHelper</h1>
<<<<<<< Updated upstream
          <h2>Analytics system for hackers</h2>
          <Button variant="contained" color="primary" size="large" onClick={this.startSession}>
            Start Session &nbsp;
            <PlayCircleOutlineIcon />
          </Button>
          <WebcamCapture setImageDataAppState={this.setImageDataAppState} />
=======
          {sessionButtonJSX}
          {webcamCaptureJSX}
>>>>>>> Stashed changes
        </div>
      </div>
    );
  }

  startSession = () => {
    // Start the session by writing to firebase
    dbFunctions.createSession(this.state.db);
    this.setState({
      sessionLive: true
    });
  };
}

export default App;
