
import React, { Component } from "react"
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

      enterWebsite() {
        this.props.setActiveUser(parseInt(localStorage.getItem("userId")))
        this.props.setFirstName(localStorage.getItem("firstName"))
        localStorage.setItem("nav", true)
        this.props.history.push("/search")
      }


    //Build login form
    render() {
        const { isAuthenticated } = this.props.auth;

        return (
            <React.Fragment>
        <div className="bg" >
            <Header />
                    <div className="container loginContainer">
                        {
              !isAuthenticated() && (
                  <Button
                    style={{margin:"auto", width:"100px", height:"100px", fontSize:"20px", borderRadius:"100%"}}
                    outline color="danger"
                    id="qsLoginBtn"
                    className="btn-margin"
                    onClick={
                      this.login.bind(this)
                    }
                  >
                    <i className="fas fa-lock" style={{fontSize:"30px"}}></i>
                  </Button>
                )
            }
             {
              isAuthenticated() && (
                  <Button
                    style={{margin:"auto", width:"100px", height:"100px", fontSize:"20px", borderRadius:"100%"}}
                    outline color="info"
                    id="qsLoginBtn"
                    className="btn-margin"
                    onClick={()=>
                      this.enterWebsite()
                    }
                  >
                  <div style={{display:"flex", flexWrap:"wrap", justifyContent:"center"}}>
                    <i className="fas fa-utensils" style={{fontSize:"30px"}}></i>
                    let's eat
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