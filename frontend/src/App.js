import React from "react";
import "./App.css";
import Button from "@material-ui/core/Button";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import WebcamCapture from "./WebcamCapture";
import dbFunctions from "./Database/Firebase";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageData: "",
      db: null,
      sessionLive: false,
      sessionID: ""
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

  handleStartSessionClick = async () => {
    const newSessionID = await dbFunctions.createSession(this.state.db);
    this.setState({
      sessionLive: !this.state.sessionLive,
      sessionID: newSessionID
    });
  };

  handleStopSessionClick = async () => {
    await dbFunctions.endSession(this.state.db, this.state.sessionID);
    this.setState({
      sessionLive: !this.state.sessionLive,
      sessionID: ""
    });
  };

  render() {
    let sessionButtonJSX = null;
    let webcamCaptureJSX = null;

    if (this.state.sessionLive) {
      webcamCaptureJSX = (
        <WebcamCapture
          db={this.state.db}
          sessionId={this.state.sessionID}
          setImageDataAppState={this.setImageDataAppState}
        />
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
