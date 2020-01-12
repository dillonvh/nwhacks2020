import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  CardHeader
} from "@material-ui/core";
import dbFunctions from "./Database/Firebase";
import Chart from "./Chart";

const likelinessValueScaleMap = {
  "VERY_UNLIKELY": 10,
  "UNLIKELY": 30,
  "POSSIBLE": 50,
  "LIKELY": 70,
  "VERY LIKELY": 90
};

class Display extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      session: {}
    };
  }

  async componentDidMount () {
    // TODO: Get charts to display
    const session = await dbFunctions.getSession(this.props.sessionId);
    this.setState({
      session
    });
  }

  render () {
    const dataPointsAnger = [];
    const dataPointsJoy = [];
    const dataPointsSorrow = [];
    const dataPointsSurprise = [];
    this.state.session.sessionData.forEach((dataEntry, index) => {
      dataPointsAnger.push({x: index * 10, y: likelinessValueScaleMap[dataEntry.sessionData.visionAPI.anger]});
      dataPointsJoy.push({x: index * 10, y: likelinessValueScaleMap[dataEntry.sessionData.visionAPI.joy]});
      dataPointsSorrow.push({x: index * 10, y: likelinessValueScaleMap[dataEntry.sessionData.visionAPI.sorrow]});
      dataPointsSurprise.push({x: index * 10, y: likelinessValueScaleMap[dataEntry.sessionData.visionAPI.surprise]});
    });
    const sessionChartCardJSX = (
      <Card>
        <Chart
          dataPointsAnger={dataPointsAnger}
          dataPointsJoy={dataPointsJoy}
          dataPointsSorrow={dataPointsSorrow}
          dataPointsSurprise={dataPointsSurprise}
          startTimestamp={this.state.session.startTimestamp}
          endTimestamp={this.state.session.endTimestamp}
        />
      </Card>
    );

    return (
      <div>
        {sessionChartCardJSX}
      </div>
    )
  }
}

export default Display;