import React, { Component } from 'react'
import { Link } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'


class NavBar extends Component {
    logout = () => {
        sessionStorage.clear("credentials")
        localStorage.clear("credentials")
    }
    render() {
        return (
            <nav className="navbar navbar-light fixed-top light-blue flex-md-nowrap p-0 shadow">
                <ul className="nav nav-pills">
                    <li className="nav-item">
                        <Link className="nav-link" to="/search">Search</Link>
                    </li>
                </ul>
                <ul className="nav nav-pills">
                    <li className="nav-item">
                        <Link className="nav-link" to="/favorites">favorites</Link>
                    </li>
                </ul>
                <ul className="nav nav-pills">
                    <li className="nav-item">
                        <Link className="nav-link" onClick={this.logout} to="/login">Logout</Link>
                    </li>
                </ul>
            </nav>
        )
    }
}

export default NavBar