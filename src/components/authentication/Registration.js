import React, { Component } from "react"


export default class Registration extends Component {

    // Set initial state
    state = {
        email: "",
        password: "",
        address: "",
        city: "",
        states: "",
        zipCode: ""
    }
    // Update state whenever an input field is edited
    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    //Build login form
    render() {
        return (
            <form onSubmit={this.handleLogin} className="px-5 mt-5">
            <header className="text-center mb-5">
            <h1 className="text-info">TENDER</h1>
            <h4>feast your eyes / go with your gut</h4>
            </header>
                <h1 className="h3 mb-3 font-weight-bold">Registration</h1>
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
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="address">
                            Address:
                </label>
                        <input onChange={this.handleFieldChange} className="form-control" type="text"
                            id="address"
                            placeholder="123 Main St."
                            required="" autoFocus="" />
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="city">
                            City:
                </label>
                        <input onChange={this.handleFieldChange} className="form-control" type="text"
                            id="city"
                            placeholder="Nashville"
                            required="" />
                    </div>
                    <div className="form-group col-md-1">
                        <label htmlFor="state">
                            State:
                </label>
                        <input onChange={this.handleFieldChange} className="form-control" type="text"
                            id="state"
                            placeholder="TN"
                            required="" />
                    </div>
                    <div className="form-group col-md-1">
                        <label htmlFor="zipCode">
                            ZIP Code:
                </label>
                        <input onChange={this.handleFieldChange} className="form-control" type="text"
                            id="zipCode"
                            placeholder="37206"
                            required="" />
                    </div>
                </div>
                <button type="submit" className="btn btn-info btn-sm" onClick={()=> this.props.history.push("/login")} >
                    Register
                </button>
            </form>
        )
    }
}