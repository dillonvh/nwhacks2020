import React from "react";
import "./App.css";
import Button from "@material-ui/core/Button";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import StopIcon from "@material-ui/icons/HighlightOff";
import WebcamCapture from "./WebcamCapture";
import dbFunctions from "./Database/Firebase";
import SelectForms from "./SelectForms.js"
import Display from "./Display";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageData: "",
      db: null,
      sessionLive: false,
      sessionId: null,
      // Hack: When session is complete
      sessionComplete: false
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
    const newSessionId = await dbFunctions.createSession(this.state.db);
    this.setState({
      sessionLive: !this.state.sessionLive,
      sessionId: newSessionId
    });
  };

  handleStopSessionClick = async () => {
    await dbFunctions.endSession(this.state.db, this.state.sessionId);
    this.setState({
      sessionLive: !this.state.sessionLive,
      sessionComplete: true
    });
  };

  render() {
    let sessionButtonJSX = null;
    let webcamCaptureJSX = null;
    let selectFormsJSX = null;
    let displayJSX = null;

    if (this.state.sessionComplete) {
      displayJSX = <Display
        db={this.state.db}
        sessionId={this.state.sessionId}
      />
    } else if (this.state.sessionLive && !this.state.sessionComplete) {
      webcamCaptureJSX = (
        <WebcamCapture
          db={this.state.db}
          sessionId={this.state.sessionId}
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
          <StopIcon />
        </Button>
      );
    } else {
      selectFormsJSX = <SelectForms />
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
          {selectFormsJSX}
          {sessionButtonJSX}
          {webcamCaptureJSX}
          {displayJSX}
        </div>
      </div>
    );
  }
}

export default App;
