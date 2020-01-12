import React from "react";
import { Card, CardContent, CardMedia, CardHeader } from "@material-ui/core";
import dbFunctions from "./Database/Firebase";
import MultiChart from "./MultiChart";
import SoloChart from "./SoloChart";

const likelinessValueScaleMap = {
  VERY_UNLIKELY: 10,
  UNLIKELY: 30,
  POSSIBLE: 50,
  LIKELY: 70,
  VERY_LIKELY: 90
};

class Display extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      session: {}
    };
  }

  async componentDidMount() {
    const session = await dbFunctions.getSession(
      this.props.db,
      this.props.sessionId
    );
    this.setState({
      session
    });
  }

  render() {
    const dataPointsAnger = [];
    const dataPointsJoy = [];
    const dataPointsSorrow = [];
    const dataPointsSurprise = [];
    const dataPointsPosture = [];

    let sessionChartCardJSX = <h3>Oh no! There's no data here. Refresh the page to try again.</h3>;

    if (
      this.state.session &&
      this.state.session.sessionData &&
      this.state.session.sessionData.length !== 0
    ) {
      this.state.session.sessionData.forEach((dataEntry, index) => {
        dataPointsAnger.push({
          x: index * 10,
          y: likelinessValueScaleMap[dataEntry.visionAPIData.anger]
        });
        dataPointsJoy.push({
          x: index * 10,
          y: likelinessValueScaleMap[dataEntry.visionAPIData.joy]
        });
        dataPointsSorrow.push({
          x: index * 10,
          y: likelinessValueScaleMap[dataEntry.visionAPIData.sorrow]
        });
        dataPointsSurprise.push({
          x: index * 10,
          y: likelinessValueScaleMap[dataEntry.visionAPIData.surprise]
        });
        dataPointsPosture.push({
          x: index * 10,
          y: 0.5 * (200 - dataEntry.visionAPIData.noseHeight)
        });
      });

      sessionChartCardJSX = (
        <div className="session-chart-wrapper">
          <div className="session-chart-wrapper-child">
            <MultiChart
              dataPointsAnger={dataPointsAnger}
              dataPointsJoy={dataPointsJoy}
              dataPointsSorrow={dataPointsSorrow}
              dataPointsSurprise={dataPointsSurprise}
              startTimestamp={this.state.session.startTimestamp}
              endTimestamp={this.state.session.endTimestamp}
            />
          </div>

          {/* Posture Chart */}
          <div className="session-chart-wrapper-child">
            <SoloChart
              titles={{
                main: "Posture Indicator for this session",
                x: "Time",
                y: "Nose Height in Frame",
                tooltip: "Time {x}s: {y}% Eye Level"
              }}
              dataPoints={dataPointsPosture}
              startTimestamp={this.state.session.startTimestamp}
              endTimestamp={this.state.session.endTimestamp}
            />
          </div>

          {/* Joy Chart */}
          <div className="session-chart-wrapper-child">
            <SoloChart
              titles={{
                main: "Joy over Time for this session",
                x: "Time",
                y: "Likeliness of Joy",
                tooltip: "Time {x}s: {y}% Joy"
              }}
              dataPoints={dataPointsJoy}
              startTimestamp={this.state.session.startTimestamp}
              endTimestamp={this.state.session.endTimestamp}
            />
          </div>

          {/* Anger Chart */}
          <div className="session-chart-wrapper-child">
            <SoloChart
              titles={{
                main: "Anger over Time for this session",
                x: "Time",
                y: "Likeliness of Anger",
                tooltip: "Time {x}s: {y}% Anger"
              }}
              dataPoints={dataPointsAnger}
              startTimestamp={this.state.session.startTimestamp}
              endTimestamp={this.state.session.endTimestamp}
            />
          </div>

          {/* Sorrow Chart */}
          <div className="session-chart-wrapper-child">
            <SoloChart
              titles={{
                main: "Sorrow over Time for this session",
                x: "Time",
                y: "Likeliness of Sorrow",
                tooltip: "Time {x}s: {y}% Sorrow"
              }}
              dataPoints={dataPointsSorrow}
              startTimestamp={this.state.session.startTimestamp}
              endTimestamp={this.state.session.endTimestamp}
            />
          </div>

          {/* Surprise Chart */}
          <div className="session-chart-wrapper-child">
            <SoloChart
              titles={{
                main: "Surprise over Time for this session",
                x: "Time",
                y: "Likeliness of Surprise",
                tooltip: "Time {x}s: {y}% Surprise"
              }}
              dataPoints={dataPointsSurprise}
              startTimestamp={this.state.session.startTimestamp}
              endTimestamp={this.state.session.endTimestamp}
            />
          </div>
        </div>
      );
    }

    return <div className="display-wrapper">{sessionChartCardJSX}</div>;
  }
}

export default Display;
