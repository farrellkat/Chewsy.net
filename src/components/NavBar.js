import React, { Component } from 'react'
import { Link } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Nav, NavItem, NavLink, Navbar, Button } from "reactstrap"

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

  render() {
    return (
           <React.Fragment>
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
    <Button
      color="link"
      id="qsLogoutBtn"
      className="btn-margin"
      onClick={this.logout.bind(this)}
      >
      Log Out
    </Button>
  </Nav>
  <Nav>
    <NavLink disabled style={{ color: "white" }}>Welcome {localStorage.getItem("firstName")}!</NavLink>
    <NavLink href="https://dev-cerpmdij.auth0.com/v2/logout" style={{ color: "white" }}>Change User</NavLink>
    <NavItem>
    <h1 className="nav-item mr-3" style={{ fontSize: "30px" }}>Chewsy</h1>
  </NavItem>
  </Nav>
      </Navbar>
  </React.Fragment>
    )
  }
}

export default NavBar