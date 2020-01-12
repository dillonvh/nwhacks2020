import React from "react";
import dbFunctions from "./Database/Firebase";
import BarChart from "./BarChart";

class OverallDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessions: []
    }
  }

  async componentDidMount () {
    const sessions = await dbFunctions.getAllSessions(this.props.db);
    this.setState({
      sessions
    });
    console.log(sessions);
  }

  render () {
    let dataPointsLanguages = [];
    let dataPointsIDEs = [];
    this.state.sessions.forEach(session => {
      if (session.initialSessionData.languageSelection !== "") {
        dataPointsLanguages.push({
          y: session.totalSessionTime,
          label: session.initialSessionData.languageSelection
        });
      }
      if (session.initialSessionData.ideSelection !== "") {
        dataPointsIDEs.push({
          y: session.totalSessionTime,
          label: session.initialSessionData.deSelection
        });
      }
    });

    const aggregatedDataPointsLanguages = {
      "C++": 0,
      "Python": 0,
      "Scala": 0,
      "JavaScript": 0,
      "Go": 0,
      "": 0
    };

    const aggregatedDataPointsIDEs = {
      "Atom": 0,
      "Eclipse": 0,
      "IntelliJ": 0,
      "PyCharm": 0,
      "Visual Studio": 0,
      "": 0
    };

    dataPointsLanguages.forEach(dataPoint => {
      aggregatedDataPointsLanguages[dataPoint.label] += dataPoint.y;
    });

    dataPointsIDEs.forEach(dataPoint => {
      aggregatedDataPointsIDEs[dataPoint.label] += dataPoint.y;
    });

    dataPointsLanguages = [];
    dataPointsIDEs = [];

    Object.keys(aggregatedDataPointsLanguages).forEach(key => {
      dataPointsLanguages.push({
        label: key,
        y: aggregatedDataPointsLanguages[key]
      });
    });

    Object.keys(aggregatedDataPointsIDEs).forEach(key => {
      dataPointsIDEs.push({
        label: key,
        y: aggregatedDataPointsIDEs[key]
      });
    });


    let sessionOverallDisplayChartJSX = <h3>Visualizations are loading</h3>;

    if (this.state.sessions && this.state.sessions.length !== 0) {
      sessionOverallDisplayChartJSX = (
        <div className="session-chart-wrapper">
          <div className="session-chart-wrapper-child">
            <BarChart
              dataPoints={dataPointsLanguages}
              titles={{
                main: "Programming language usage over all sessions",
                x: "Progamming language",
                y: "Hours spent writing code in the language"
              }}
            />
          </div>

          <div className="session-chart-wrapper-child">
            <BarChart
              dataPoints={dataPointsIDEs}
              titles={{
                main: "IDE usage over all sessions",
                x: "IDE",
                y: "Hours spent using the IDE"
              }}
            />
          </div>
        </div>
      )
    }

    return (
      <div className="display-wrapper">
        <h3>Here are some visualizations that analyze all of your sessions:</h3>
        {sessionOverallDisplayChartJSX}
      </div>
    )
  }
}

export default OverallDisplay;