import React from "react";
import dbFunctions from "./Database/Firebase";
import BarChart from "./BarChart";

class OverallDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      session: {}
    }
  }

  async componentDidMount () {
    const session = await dbFunctions.getSession(
      this.props.db,
      this.props.sessionId
    );
    this.setState({
      session
    });
  }

  render () {

    return (
      <div>
        <h3>Here are some visualizations that analyze all of your sessions:</h3>
        <BarChart

        />
      </div>
    )
  }
}

export default OverallDisplay;