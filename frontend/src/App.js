import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Button from "@material-ui/core/Button";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";

function App() {
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

export default App;
