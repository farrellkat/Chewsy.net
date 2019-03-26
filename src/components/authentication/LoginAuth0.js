
import React, { Component } from "react"
// import { Link } from "react-router-dom"
// import UserManager from "../../modules/UserManager";
import Header from "../Header"
import {Button} from "reactstrap"




export default class LoginAuth0 extends Component {

    goTo(route) {
        this.props.history.replace(`/${route}`)
      }

      login() {
        this.props.auth.login();
      }

      logout() {
        this.props.auth.logout();
      }

      componentDidMount() {
        const { renewSession } = this.props.auth;

        if (localStorage.getItem('isLoggedIn') === 'true') {
          renewSession();
        }
      }

      welcomeMessage = localStorage.getItem("isLoggedIn") ? "Welcome! Let's eat!" : "Please Log in"

    //Build login form
    render() {
        const { isAuthenticated } = this.props.auth;

        return (
            <React.Fragment className="main">
        <div className="bg" >
            <Header />
            {/* <form onSubmit={this.handleLogin} className="px-5 mt-5" style={{backgroundColor: "rgb(245, 138, 88, 0.2)", borderRadius: "5px", width:"80%", padding:5}}> */}
                    <div className="container">
                        <h1 className="h3 mb-3 font-weight-bold" style={{textAlign:"center"}}>{this.welcomeMessage}</h1>
                        {
              !isAuthenticated() && (
                  <Button
                    id="qsLoginBtn"
                    bsStyle="primary"
                    className="btn-margin"
                    onClick={this.login.bind(this)}
                  >
                    Log In
                  </Button>
                )
            }
                    </div>
                {/* </form> */}
            </div>
            </React.Fragment >
        )
    }
}