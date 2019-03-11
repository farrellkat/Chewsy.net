import React, { Component } from "react"
import { Route, Redirect } from "react-router-dom"
import SearchForm from "./searchForm";
import Login from "./authentication/Login"
import apiModule from "../modules/apiModule";
import Registration from "./authentication/Registration";
// import UserManager from "../modules/UserManager"
export default class ApplicationViews extends Component {

    isAuthenticated = () => (sessionStorage.getItem("credentials") !== null || localStorage.getItem("credentials") !== null)

    state = {
        categories: [],
        activeUser: {},
        states: [],
        radii: []
    }

    componentDidMount() {
        const newState = {}

        apiModule.getAllCategories().then(allCategories => {
            this.setState({
                categories: allCategories
            })
        })
            .then(() => this.setState(newState))
            .then(() => apiModule.getAllStates()).then(allStates => {
                this.setState({
                    states: allStates
                })
            })
            .then(() => apiModule.getAllRadii()).then(allRadii => {
                this.setState({
                    radii: allRadii
                })
            })
    }

    // getRandomRestaurant() {
    //     apiModule.getTotalRestaurants().then((b) => this.getRandomNumber(b.total)).then((getRandomNumber) => console.log(getRandomNumber))
    // }

    getRandomNumber = (businesses) => Math.floor(Math.random() * businesses.total + 1)

    getRandomOffset = (city, state, radius, category1, category2, category3) =>
        apiModule.getRestaurantSeachTotal(city, state, radius, category1, category2, category3)
            .then((b) => {
                const businessArray = b
                const randomNumber = this.getRandomNumber(businessArray)
                return randomNumber
            })

    getAllRandomOffset = (city, state, radius) =>
        apiModule.getTotalRestaurants(city, state, radius)
            .then((b) => {
                const businessArray = b
                const randomNumber = this.getRandomNumber(businessArray)
                return randomNumber
            })

    render() {
        return (
            <React.Fragment>
                <Route exact path="/login" render={(props) => {
                    return <Login {...props} getActiveUser={this.getActiveUser} />
                }} />
                <Route exact path="/registration" render={(props) => {
                    return <Registration {...props} />
                }}
                />
                <Route exact path="/search" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <SearchForm categories={this.state.categories}
                            states={this.state.states}
                            radii={this.state.radii}
                            activeUser={this.props.activeUser}
                            getRandomOffset={this.getRandomOffset}
                            getAllRandomOffset={this.getAllRandomOffset}/>
                    } else {
                        return <Redirect to="/login" />
                    }
                }
                } />
            </React.Fragment>
        );
    }
}