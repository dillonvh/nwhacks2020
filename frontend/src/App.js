import React from "react";
import "./App.css";
import Button from "@material-ui/core/Button";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import initFirebase from "./Database/Firebase";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    // Initialize the database connection here
    const db = initFirebase();
  }

  render () {
    return (
      <div className="App">
        <div className="Main">
          <h1>
            HackerHelper
          </h1>
          <Button variant="contained" color="primary" size="large">
            Start Session &nbsp;
            <PlayCircleOutlineIcon />
          </Button>
        </div>
      </div>
    );
  }


  startSession = () => {
    // Start the session by writing to firebase
  }

  takePicture = () => {
    // Take a picture from the webcam, write it to Cloud Storage, get the image URL back and store it in firebase
  }


}

export default App;
