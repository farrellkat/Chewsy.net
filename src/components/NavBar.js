import React, { Component } from 'react'
import { Link } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import { Nav, NavItem, NavLink, Navbar } from "reactstrap"


class NavBar extends Component {
    logout = () => {
        sessionStorage.clear("credentials")
        localStorage.clear("credentials")
    }
    render() {
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
                    <NavLink tag={Link}  className="nav-link text-info" to="/friends">Friends</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link} className="nav-link text-info" to="/findfriends">Find Friends</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink tag={Link}  className="nav-link text-warning" onClick={this.logout} to="/login">Logout</NavLink>
                </NavItem>
            </Nav>
            <Nav>
                <NavItem>
                <h1 className="nav-item" style={{fontSize: "25px"}}>Chewsy</h1>
                </NavItem>
                </Nav>
            </Navbar>
        )
    }
}

export default NavBar