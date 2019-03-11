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
        radii: [],
        randomNumber: "",
        category1: "",
        category2: "",
        category3: "",
        cityInput: "",
        stateInput: "",
        radiiInput: "",
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

    updateUserState = (category1, category2, category3, cityInput, stateInput, radiiInput) => {
        this.setState({
            category1: category1,
            category2: category2,
            category3: category3,
            cityInput: cityInput,
            stateInput: stateInput,
            radiiInput: radiiInput
        });
    };

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

    // initialFoodSearch = () => {
    //     this.getRandomOffset(
    //         this.state.cityInput,
    //         this.state.stateInput,
    //         this.state.radiiInput,
    //         this.state.category1,
    //         this.state.category2,
    //         this.state.category3).then(randomNumber => {
    //             this.setState({
    //                 randomNumber: randomNumber
    //             })
    //         }).then(() =>
    //             apiModule.getRandomRestaurant(
    //                 this.state.cityInput,
    //                 this.state.stateInput,
    //                 this.state.radiiInput,
    //                 this.state.category1,
    //                 this.state.category2,
    //                 this.state.category3,
    //                 this.state.randomNumber
    //             )).then((res) => console.log(res))
    // }

    // initialSurpriseSearch = () => {
    //     this.props.getAllRandomOffset(
    //         this.state.cityInput,
    //         this.state.stateInput,
    //         this.state.radiiInput).then(randomNumber => {
    //             this.setState({
    //                 randomNumber: randomNumber
    //             })
    //         }).then(() =>
    //             apiModule.getRandomSurpriseRestaurant(
    //                 this.state.cityInput,
    //                 this.state.stateInput,
    //                 this.state.radiiInput,
    //                 this.state.randomNumber
    //             )).then((res) => console.log(res, this.state.randomNumber))
    // }

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
                            getAllRandomOffset={this.getAllRandomOffset}
                            updateUserState={this.updateUserState}
                            category1={this.state.category1}
                            category2={this.state.category2}
                            category3={this.state.category3}
                            cityInput={this.state.cityInput}
                            stateInput={this.state.stateInput}
                            radiiInput={this.state.radiiInput}/>
                    } else {
                        return <Redirect to="/login" />
                    }
                }
                } />
            </React.Fragment>
        );
    }
}