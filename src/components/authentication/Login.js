import React, { Component } from "react"


export default class Login extends Component {

    // Set initial state
    state = {
        email: "",
        password: "",
        rememberMe: false
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
            sessionStorage.setItem(
                "credentials",
                JSON.stringify({
                    email: this.state.email,
                    password: this.state.password
                })
            )
        } else {
    //If checked set credentials to local storage
            localStorage.setItem(
                "credentials",
                JSON.stringify({
                    email: this.state.email,
                    password: this.state.password
                })
            )
        }
    }
    //Build login form
    render() {
        const { email, password } = this.state;
        const isEnabled = email.length > 0 && password.length > 0;
        return (
            <form onSubmit={this.handleLogin} className="px-5 mt-5">
            <header className="text-center mb-5">
            <h1 className="text-info">TENDER</h1>
            <h4>feast your eyes / go with your gut</h4>
            </header>
                <h1 className="h3 mb-3 font-weight-bold">Please sign in</h1>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="inputEmail">
                            Email address:
                </label>
                        <input onChange={this.handleFieldChange} className="form-control" type="email"
                            id="email"
                            placeholder="Email address"
                            required="" autoFocus="" />
                    </div>
                    <div className="form-group col-md-6">
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
                    <div className="form-check d-flex justify-content-between">
                        <input onChange={this.handleCheck} className="form-check-input" type="checkbox" id="rememberMe" />
                        <label htmlFor="checkbox">Remember me</label>
                        <a href="registration" className="d-flex-end" id="registerLink" onClick={()=> this.props.history.push("/registration")}>New user?</a>
                    </div>
                </div>
                <button type="submit" className="btn btn-info btn-sm" disabled={!isEnabled}>
                    Sign in
                </button>
            </form>
        )
    }
}