import React, { Component } from "react";
import "./App.css";
import ApplicationViews from "./components/ApplicationViews"
import NavBar from "./components/NavBar";
import Header from "./components/Header";

class App extends Component {

  isAuthenticated = () => (sessionStorage.getItem("credentials") !== null || localStorage.getItem("credentials") !== null)

  render() {
    let navHeader = this.isAuthenticated() ? <NavBar /> : '';
    return (
      <React.Fragment>
        {navHeader}
        <ApplicationViews />
      </React.Fragment>
    );
  }
}

export default App;
