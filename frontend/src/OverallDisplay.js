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
    const dataPointsLanguages = [];
    const dataPointsIDEs = [];
    this.state.sessions.forEach(session => {
      dataPointsLanguages.push({
        y: session.totalSessionTime,
        label: session.initialSessionData.languageSelection
      });
      dataPointsIDEs.push({
        y: session.totalSessionTime,
        label: session.initialSessionData.IdeSelection
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
                y: "Progamming language",
                x: "Hours spent writing code in the language"
              }}
            />
          </div>

          <div className="session-chart-wrapper-child">
            <BarChart
              dataPoints={dataPointsIDEs}
              titles={{
                main: "IDE usage over all sessions",
                y: "IDE",
                x: "Hours spent using the IDE"
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