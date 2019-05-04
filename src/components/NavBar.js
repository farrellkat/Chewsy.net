import React, { Component } from 'react'
import { Link } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Nav, NavItem, NavLink, Navbar, Button, NavbarBrand, NavbarToggler, Collapse } from "reactstrap"


class NavBar extends Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  navLinks =
    <React.Fragment>
      <Nav navbar>
        <NavItem>
        <NavLink disabled style={{ color: "white" }}>Welcome {localStorage.getItem("firstName")}!</NavLink>
        </NavItem>
        <NavItem>
        <NavLink href="https://dev-cerpmdij.auth0.com/v2/logout" style={{ color: "white" }}>Change User</NavLink>
        </NavItem>
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
        {/* <NavItem> */}
          <Button
            color="link"
            id="qsLogoutBtn"
            className="btn-margin logoutButton"
            onClick={this.logout.bind(this)}
          >
            Log Out
</Button>
        {/* </NavItem> */}
      </Nav>
    </React.Fragment>

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
    return (
      <React.Fragment>
        <Navbar color="dark" dark>
          <NavbarBrand className="mr-auto chewsyNavTitle"><h1>Chewsy</h1></NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={!this.state.collapsed} navbar>
            {
              (localStorage.getItem("nav")) ?
                this.navLinks
                : ""
            }
          </Collapse>
        </Navbar>
      </React.Fragment>
    )
  }
}

export default NavBar