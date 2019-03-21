import React, { Component } from "react";
import "./App.css";
import ApplicationViews from "./components/ApplicationViews"
import NavBar from "./components/NavBar";
import UserManager from "./modules/UserManager"

class App extends Component {
  state = {
    activeUser: {}
  }

  componentDidMount() {
    UserManager.get(this.activeUserId()).then(activeUser =>
      this.setState({ activeUser: activeUser })

    )
  }
  activeUserId = () => parseInt(sessionStorage.getItem("credentials"))

  render() {

    return (
      <React.Fragment>
        <NavBar activeUser={this.state.activeUser}/>
        <ApplicationViews />
      </React.Fragment>
    );
  }
}

export default App;
