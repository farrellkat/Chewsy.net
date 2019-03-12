import React, { Component } from "react"
import { Link } from "react-router-dom"
import UserManager from "../../modules/UserManager";


function validate(email, password) {
    // true means invalid, so our conditions got reversed
    return {
        email: email.length === 0,
        password: password.length === 0
    };
}



export default class Login extends Component {

    activeUserId = () => parseInt(sessionStorage.getItem("credentials"))

    // Set initial state
    state = {
        email: "",
        password: "",
        rememberMe: false,
        activeUser: {}
    }
    errors = {
        name: false,
        email: true,
    }

    // Update state whenever an input field is edited
    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }
    //set state of checkbox to opposite of what's printed as default.
    handleCheck = () => {
        this.setState({
            rememberMe: !this.state.rememberMe
        })
    }

    // Simplistic handler for login submit
    handleLogin = (e) => {
        e.preventDefault()
        // If remember me isn't checked set credentials to session storage
        if (this.state.rememberMe === false) {
            UserManager.matchLoginEmail(this.state.email)
                .then((user) => {
                    localStorage.setItem(
                        "credentials", parseInt(user[0].id)
                    )
                    this.props.history.push("/search")
                })
                .then(() =>
                this.props.setActiveUser(localStorage.getItem("credentials")))
        } else {
            //If checked set credentials to local storage
            UserManager.matchLoginEmail(this.state.email)
                .then((user) => {
                    localStorage.setItem(
                        "credentials", parseInt(user[0].id)
                    )
                    this.props.history.push("/search")
                }).then(() => this.props.setActiveUser(localStorage.getItem("credentials")))
        }
    }

    //Build login form
    render() {
        const errors = validate(this.state.email, this.state.password);
        const isEnabled = !Object.keys(errors).some(x => errors[x]);

        return (
            <form onSubmit={this.handleLogin} className="px-5 mt-5">
                <div className="container">
                    <h1 className="h3 mb-3 font-weight-bold">Please sign in</h1>
                    <div className="form-row">
                        <div className="form-group col-md-3">
                            <label htmlFor="inputEmail">
                                Email address:
                </label>
                            <input onChange={this.handleFieldChange} className={errors.email ? "error form-control" : "form-control"} type="email"
                                id="email"
                                placeholder="Email address"
                                required="" autoFocus="" />
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="inputPassword">
                                Password:
                </label>
                            <input onChange={this.handleFieldChange} className="form-control" type="password"
                                id="password"
                                placeholder="Password"
                                required="" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="form-check d-flex">
                            <input onChange={this.handleCheck} className="form-check-input" type="checkbox" id="rememberMe" />
                            <label htmlFor="checkbox">Remember me</label>
                            <Link className="ml-5" to="/registration">New User?</Link>
                        </div>
                    </div>
                    <button type="submit"
                        className="btn btn-info btn-sm"
                        disabled={!isEnabled}
                        onClick={this.handleLogin}>
                        Sign in
                </button>
                </div>
            </form>
        )
    }
}