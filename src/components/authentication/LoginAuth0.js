
import React, { Component } from "react"
// import { Link } from "react-router-dom"
// import UserManager from "../../modules/UserManager";
import Header from "../Header"
import {Button } from "reactstrap"




export default class LoginAuth0 extends Component {

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
        }
      }

      welcomeMessage = localStorage.getItem("isLoggedIn") ? "Welcome! Let's eat!" : "Please Log in"

    //Build login form
    render() {
        const { isAuthenticated } = this.props.auth;

        return (
            <React.Fragment>
        <div className="bg" >
            <Header />
            {/* <form onSubmit={this.handleLogin} className="px-5 mt-5" style={{backgroundColor: "rgb(245, 138, 88, 0.2)", borderRadius: "5px", width:"80%", padding:5}}> */}
                    <div className="container loginContainer">
                        {/* <h1 className="h3 mb-3 font-weight-bold" style={{textAlign:"center", color:"white"}}>{this.welcomeMessage}</h1> */}
                        {
              !isAuthenticated() && (
                  <Button
                    style={{margin:"auto", width:"100px", height:"100px", fontSize:"20px", borderRadius:"100%"}}
                    outline color="info"
                    id="qsLoginBtn"
                    className="btn-margin"
                    onClick={
                      this.login.bind(this)
                    }
                  >
                    <i className="fas fa-utensils" style={{fontSize:"30px"}}></i>
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