import React from "react";
import "./App.css";
import Button from "@material-ui/core/Button";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import WebcamCapture from "./WebcamCapture";
import dbFunctions from "./Database/Firebase";
import CanvasJSReact from "./canvasjs.react";

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

    var CanvasJS = CanvasJSReact.CanvasJS;
    var CanvasJSChart = CanvasJSReact.CanvasJSChart;

    const options = {
      animationEnabled: true,
      exportEnabled: true,
      theme: "light2", // "light1", "dark1", "dark2"
      title: {
        text: "Bounce Rate by Week of Year"
      },
      axisY: {
        title: "Bounce Rate",
        includeZero: false,
        suffix: "%"
      },
      axisX: {
        title: "Week of Year",
        prefix: "W",
        interval: 2
      },
      data: [
        {
          type: "line",
          toolTipContent: "Week {x}: {y}%",
          dataPoints: [
            { x: 1, y: 64 },
            { x: 2, y: 61 },
            { x: 3, y: 64 },
            { x: 4, y: 62 },
            { x: 5, y: 64 },
            { x: 6, y: 60 },
            { x: 7, y: 58 },
            { x: 8, y: 59 },
            { x: 9, y: 53 },
            { x: 10, y: 54 },
            { x: 11, y: 61 },
            { x: 12, y: 60 },
            { x: 13, y: 55 },
            { x: 14, y: 60 },
            { x: 15, y: 56 },
            { x: 16, y: 60 },
            { x: 17, y: 59.5 },
            { x: 18, y: 63 },
            { x: 19, y: 58 },
            { x: 20, y: 54 },
            { x: 21, y: 59 },
            { x: 22, y: 64 },
            { x: 23, y: 59 }
          ]
        },
        {
          type: "line",
          toolTipContent: "Week {x}: {y}%",
          dataPoints: [
            { x: 1, y: 4 },
            { x: 2, y: 6 },
            { x: 3, y: 6 },
            { x: 4, y: 6 },
            { x: 5, y: 6 },
            { x: 6, y: 6 },
            { x: 7, y: 5 },
            { x: 8, y: 5 },
            { x: 9, y: 5 },
            { x: 10, y: 4 },
            { x: 11, y: 1 },
            { x: 12, y: 0 },
            { x: 13, y: 5 },
            { x: 14, y: 6 },
            { x: 15, y: 5 },
            { x: 16, y: 6 },
            { x: 17, y: 5 },
            { x: 18, y: 6 },
            { x: 19, y: 5 },
            { x: 20, y: 5 },
            { x: 21, y: 5 },
            { x: 22, y: 6 },
            { x: 23, y: 5 }
          ]
        }
      ]
    };

    return (
      <div className="App">
        <div className="Main">
          <h1>HackerHelper</h1>
          {sessionButtonJSX}
          {webcamCaptureJSX}
          <div>
            <CanvasJSChart
              options={options}
              /* onRef={ref => this.chart = ref} */
            />
            {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
