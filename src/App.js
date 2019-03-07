import React, { Component } from "react";
import "./App.css";
import ApplicationViews from "./components/ApplicationViews"
import NavBar from "./components/NavBar";
import Header from "./components/Header";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Header />
        <ApplicationViews />
      </React.Fragment>
    );
  }
}

export default App;
