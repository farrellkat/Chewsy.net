import React, { Component } from 'react'
import { Link } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Nav, NavItem, NavLink, Navbar } from "reactstrap"

class NavBar extends Component {

    isAuthenticated = () => (sessionStorage.getItem("credentials") !== null || localStorage.getItem("credentials") !== null)

    logout = () => {
        sessionStorage.clear("credentials")
        localStorage.clear("credentials")
    }

    render() {
        let logoutLink = this.isAuthenticated() ?
            <NavItem>
                <NavLink tag={Link} className="nav-link text-warning" onClick={this.logout} to="/login">Logout</NavLink>
            </NavItem> : "";
        return (
            <Navbar color="dark">
                <Nav pills>
                    <NavItem>
                        <NavLink tag={Link} className="nav-link text-info" to="/">Search</NavLink>
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
                    {logoutLink}
                </Nav>
                <Nav>
                    <NavItem>
                        <h1 className="nav-item mr-3" style={{ fontSize: "30px" }}>Chewsy</h1>
                    </NavItem>
                </Nav>
            </Navbar>
        )
    }
}

export default NavBar