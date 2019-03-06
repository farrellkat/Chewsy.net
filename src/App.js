import React, { Component } from "react";
import "./App.css";
import ApplicationViews from "./components/ApplicationViews"
import NavBar from "./components/NavBar";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <ApplicationViews />
      </React.Fragment>
    );
  }
}

export default App;
