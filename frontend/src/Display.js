import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  CardHeader
} from "@material-ui/core";
import dbFunctions from "./Database/Firebase";

class Display extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sessionData: []
    };
  }

  componentDidMount () {
    // TODO: Get charts to display
    const sessionData = dbFunctions.getSessionData(this.props.sessionId);
    this.setState({
      sessionData
    });
  }

  render () {
    const sessionDataCardsJSX = this.state.sessionData.map(sessionDataObj => {
      return (
        <Card>
          <CardHeader>
            This is a Card!
          </CardHeader>
        </Card>
      )
    });

    return (
      <div>
        {sessionDataCardsJSX}
      </div>
    )
  }
}