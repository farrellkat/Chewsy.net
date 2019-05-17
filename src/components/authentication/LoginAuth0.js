
import React, { Component } from "react"
import Header from "../Header"
import { Button } from "reactstrap"
// import loading from './loading.svg';

const textArray = ['Sign Up', 'Log In'];
export default class LoginAuth0 extends Component {
  constructor() {
    super();
    this.state = { textIdx: 0 };
  }

  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login()
  }

  logout() {
    this.props.auth.logout();
  }

  componentDidMount() {
    const { renewSession } = this.props.auth;

    if (localStorage.getItem('isLoggedIn') === 'true') {
      renewSession();
    };

    this.timeout = setInterval(() => {
      let currentIdx = this.state.textIdx;
      this.setState({ textIdx: currentIdx + 1 });
    }, 3500);
  }

  componentDidUnmount() {
    clearInterval(this.timeout);
  }

  enterWebsite() {
    this.props.setActiveUser(parseInt(localStorage.getItem("userId")))
    this.props.setFirstName(localStorage.getItem("firstName"))
    localStorage.setItem("nav", true)
    this.props.history.push("/search")
  }


  //Build login form
  render() {
    const { isAuthenticated } = this.props.auth;
    let textThatChanges = textArray[this.state.textIdx % textArray.length];

    return (
      <React.Fragment>
        <div className="bg" >
          <Header />
          <div className="container loginContainer">
            {
              !isAuthenticated() && (
                  <Button
                    style={{ margin: "auto", width: "100px", height: "100px", fontSize: "20px", borderRadius: "100%" }}
                    outline color="danger"
                    id="qsLoginBtn"
                    className="btn-margin"
                    onClick={
                      this.login.bind(this)
                    }
                  >
                    <div className="loginText" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                      <i className="fas fa-lock" style={{ fontSize: "30px" }}></i>
                      {textThatChanges}
                  </div>
                  </Button>
              )
            }
            {
              isAuthenticated() && (
                <Button
                  style={{ margin: "auto", width: "100px", height: "100px", fontSize: "20px", borderRadius: "100%" }}
                  color="info"
                  id="loginBtn"
                  className="btn-margin"
                  onClick={() =>
                    window.setTimeout(() => {
                      this.enterWebsite();
                   }, 1000)
                  }
                >
                  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                    <i className="fas fa-utensils" style={{ fontSize: "30px" }}></i>
                    let's eat
                  </div>
                </Button>
              )
            }
            {
              isAuthenticated() && (
                <Button
                  style={{ margin: "auto", width: "100px", height: "100px", fontSize: "20px", borderRadius: "100%" }}
                  color="warning"
                  id="loadingBtn"
                  className="btn-margin"
                >
                  <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
                    <i className="fas fa-utensils" style={{ fontSize: "30px" }}></i>
                    Loading...
                  </div>
                </Button>
              )
            }
          </div>
        </div>
      </React.Fragment >
    )
  }
}