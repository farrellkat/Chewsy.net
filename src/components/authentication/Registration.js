import React, { Component } from "react"
import UserManager from "../../modules/UserManager"

function validate(email, password, firstName, lastName, address, city, state, zipCode) {
    // true means invalid, so our conditions got reversed
    return {
        email: email.length === 0,
        password: password.length === 0,
        firstName: firstName.length === 0,
        lastName: lastName.length === 0,
        address: address.length === 0,
        city: city.length === 0,
        state: state.length === 0,
        zipCode: zipCode.length === 0
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
            email: this.state.email,
            password: this.state.password,
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            address: this.state.address,
            city: this.state.city,
            state: this.state.state,
            zipCode: this.state.zipCode
        }
        console.log(newUser)
        if (this.state.email && this.state.password) {
            UserManager.searchEmail(this.state.email).then(users => {
                if (users.length) {
                    alert(`Email ${this.state.email} already exits!`)
                } else {
                    UserManager.addUser(newUser).then(user => {
                        sessionStorage.setItem("credentials", JSON.stringify({
                            userId: parseInt(user.id),
                            address: user.address,
                            city: user.city,
                            state: user.state,
                            zipCode: user.zipCode

                        }))
                        this.props.history.push("/search")
                        this.props.setAuth()
                    })
                }
            })
        }
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
            this.state.email,
            this.state.password,
            this.state.firstName,
            this.state.lastName,
            this.state.address,
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
                    <h1 className="h3 mb-3 font-weight-bold text-left">Registration</h1>
                    <div className="form-row">
                        <div className="form-group col-md-4">
                            <label htmlFor="email">
                                Email address:
                </label>
                            <input className={shouldMarkError("email") ? "error border border-warning form-control" : "form-control"}
                                onBlur={this.handleBlur("email")}
                                onChange={this.handleFieldChange}
                                type="email"
                                id="email"
                                value={this.state.email}
                                placeholder="Email address"
                                required="" autoFocus="" />
                        </div>
                        <div className="form-group col-md-4">
                            <label htmlFor="inputPassword">
                                Password:
                </label>
                            <input onChange={this.handleFieldChange} className={errors.password ? "error form-control" : "form-control"} type="password"
                                id="password"
                                placeholder="Password"
                                required="" />
                        </div>
                    </div>
                    <div className="form-row">
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
                        <div className="form-group col-md-4">
                            <label htmlFor="address">
                                Address:
                </label>
                            <input onChange={this.handleFieldChange} className="form-control" type="text"
                                id="address"
                                placeholder="123 Main St."
                                required="" autoFocus="" />
                        </div>
                        <div className="form-group col-md-2">
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
                        <button type="submit" disabled={!isEnabled} className="btn btn-info"
                            onClick={this.handleRegister}>
                            Register
                </button>
                </div>
            </form>
        )
    }
}