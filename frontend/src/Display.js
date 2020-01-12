import React from "react";
import { Card, CardContent, CardMedia, CardHeader } from "@material-ui/core";
import dbFunctions from "./Database/Firebase";
import EmotionChart from "./EmotionChart";
import PostureChart from "./PostureChart";

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
    console.log("component did mount, sessionId:", this.props.sessionId);
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

    let sessionChartCardJSX = <h1>No session yet! Can't make a chart</h1>;

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
          y: dataEntry.visionAPIData.midpointHeight
        });
      });

      sessionChartCardJSX = (
        <div>
          <div>
            <EmotionChart
              dataPointsAnger={dataPointsAnger}
              dataPointsJoy={dataPointsJoy}
              dataPointsSorrow={dataPointsSorrow}
              dataPointsSurprise={dataPointsSurprise}
              startTimestamp={this.state.session.startTimestamp}
              endTimestamp={this.state.session.endTimestamp}
            />
          </div>
          <div>
            <PostureChart
              dataPointsPosture={dataPointsPosture}
              startTimestamp={this.state.session.startTimestamp}
              endTimestamp={this.state.session.endTimestamp}
            />
          </div>
        </div>
      );
    }

    return <div>{sessionChartCardJSX}</div>;
  }
}

export default Display;
