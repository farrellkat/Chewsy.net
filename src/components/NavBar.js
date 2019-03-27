import React, { Component } from 'react'
import { Link } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Nav, NavItem, NavLink, Navbar, Button } from "reactstrap"

const userName = localStorage.getItem("userName")
class NavBar extends Component {

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
    // isAuthenticated = () => (sessionStorage.getItem("credentials") !== null || localStorage.getItem("credentials") !== null)

    // logout = () => {
    //     sessionStorage.clear("credentials")
    //     localStorage.clear("credentials")
    // }

    render() {
        const { isAuthenticated } = this.props.auth;
        return (
            <Navbar color="dark">
                <Nav pills>
                    <NavItem>
                        <NavLink tag={Link} className="nav-link text-info" to="/search">Search</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} className="nav-link text-info" to="/favorites">Favorites</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} className="nav-link text-info" to="/friends">Friends</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink tag={Link} className="nav-link text-info" to="/findfriends">Find Friends</NavLink>
                    </NavItem>
                    {/* <NavItem>
                        <NavLink tag={Link} className="nav-link text-info" to="/profile">My Profile</NavLink>
                      </NavItem> */}
            {
                isAuthenticated() && (
                    <Button
                    color="link"
                    id="qsLogoutBtn"
                    className="btn-margin"
                    onClick={this.logout.bind(this)}
                    >
                      Log Out
                    </Button>
                )
              }
              {
                isAuthenticated() && (
                  <NavLink disabled style={{color:"white"}}>Welcome {userName}!</NavLink>
                  )
                }
              </Nav>
                <Nav>
                    {
                      isAuthenticated() && (
              <NavLink href="https://dev-cerpmdij.auth0.com/v2/logout/?returnTo=http://localhost:3000/search" style={{color:"white"}}>Change User</NavLink>
                      )
            }
                    <NavItem>
                        <h1 className="nav-item mr-3" style={{ fontSize: "30px" }}>Chewsy</h1>
                    </NavItem>
                </Nav>
            </Navbar>
        )
    }
}

export default NavBar