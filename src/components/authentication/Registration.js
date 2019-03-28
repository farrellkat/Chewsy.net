import React, { Component } from "react"
import UserManager from "../../modules/UserManager"
import { Link } from "react-router-dom"
import takeout from "../../img/takeout.png"

function validate(email, password, firstName, lastName, address, city, state, zipCode) {
    // true means invalid, so our conditions got reversed
    return {
        email: email.length === 0,
        password: password.length === 0,
        firstName: firstName.length === 0,
        lastName: lastName.length === 0,
        address: address.length === 0
    };
}

export default class Registration extends Component {

    // Set initial state
    state = {
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        touched: {
            email: false,
            password: false,
        }
    }

    handleRegister = e => {
        e.preventDefault()
        const newUser = {
            email: sessionStorage.getItem("email"),
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            city: this.state.city,
            state: this.state.state,
            zipCode: this.state.zipCode,
            authId: sessionStorage.getItem("authId"),
            userName: sessionStorage.getItem("userName")
        }
        UserManager.addUser(newUser)
            .then(user => {
                this.props.setActiveUser((user.id))
                localStorage.setItem("userId",
                    parseInt(user.id)
                )
            })
        this.props.history.push("/")
    }

    // Update state whenever an input field is edited
    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true },
        });
    }


    //Build login form
    render() {
        const errors = validate(
            this.state.firstName,
            this.state.lastName,
            this.state.state,
            this.state.city,
            this.state.zipCode
        );
        const isEnabled = !Object.keys(errors).some(x => errors[x]);
        const shouldMarkError = (field) => {
            const hasError = errors[field];
            const shouldShow = this.state.touched[field];

            return hasError ? shouldShow : false;

        };

        return (
            <form className="px-5 mt-5 max-width">
                <div className="container">
                    <h1 className="h3 font-weight-bold text-left" style={{ marginBottom: "0px" }}>Welcome to Chewsy!</h1>
                    <small style={{ marginTop: "0px", marginBottom: "20px" }}>Tell us a little about yourself</small>
                    <div className="form-row mt-4">
                        <div className="form-group col-md-4">
                            <label htmlFor="firstName">
                                First Name:
                </label>
                            <input onChange={this.handleFieldChange} className="form-control" type="text"
                                id="firstName"
                                placeholder="David"
                                required="" autoFocus="" />
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="lastName">
                                Last Name:
                </label>
                            <input onChange={this.handleFieldChange} className="form-control" type="text"
                                id="lastName"
                                placeholder="Chang"
                                required="" autoFocus="" />
                        </div>
                    </div>
                    <div className="form-row">
                        <div className="form-group col-md-2">
                            <label htmlFor="city">
                                City:
                </label>
                            <input onChange={this.handleFieldChange} className="form-control" type="text"
                                id="city"
                                placeholder="Nashville"
                                required="" autoFocus="" />
                        </div>
                        <div className="form-group col-md-1">
                            <label htmlFor="stateInput">
                                State:
                </label>
                            <select className="custom-select"
                                name="state"
                                id="state"
                                required="" autoFocus=""
                                // defaultValue={this.state.stateInput}
                                onChange={this.handleFieldChange}
                            >
                                <option>State</option>
                                {this.props.states.map(state => (
                                    <option key={state.abbreviation} value={state.abbreviation}>
                                        {state.abbreviation}
                                    </option>
                                ))}
                            </select>
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
                    <button type="submit" disabled={!isEnabled} className="btn btn-info"
                        onClick={this.handleRegister}>
                        Register
                </button>
                    <Link className="ml-5" to="/login">Login</Link>
                </div>
                <img src={takeout} alt="takeout" className="registrationTakeout" />
            </form>
        )
    }
}