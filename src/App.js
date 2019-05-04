import React, { Component } from 'react';
import NavBar from "./components/NavBar"
import './App.css';
import ApplicationViews from './components/ApplicationViews';

export default class App extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  // componentDidMount() {
  //   const { renewSession } = this.props.auth;

  //   if (localStorage.getItem('isLoggedIn') === 'true') {
  //     renewSession();
  //   }
  // }

  render() {
    // const { isAuthenticated } = this.props.auth;

    return (
        <React.Fragment>
          {
            (localStorage.getItem("isLoggedIn"))
            ?<NavBar auth={this.props.auth}/>
            : ""
          }
        <ApplicationViews auth={this.props.auth} />
      </React.Fragment>
    );
  }
}