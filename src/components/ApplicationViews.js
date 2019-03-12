import React, { Component } from "react"
import { Route, Redirect } from "react-router-dom"
import SearchForm from "./searchForm";
import Login from "./authentication/Login"
import apiModule from "../modules/apiModule";
import Registration from "./authentication/Registration";
import CardViewer from "./CardViewer";
import MainRestaurantCard from "./MainRestaurantCard";
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
        businessInfo: "",
        businessImage: "",
    }

setActiveUser = (userId) => {
    this.setState({
        activeUser: userId
    })
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
        }, () => this.FoodSearch());
    };
    updateSurpriseUserState = (category1, category2, category3, cityInput, stateInput, radiiInput) => {
        this.setState({
            category1: category1,
            category2: category2,
            category3: category3,
            cityInput: cityInput,
            stateInput: stateInput,
            radiiInput: radiiInput
        }, () => this.SurpriseSearch());
    };

    FoodSearch = () => {
        this.getRandomOffset(
            this.state.cityInput,
            this.state.stateInput,
            this.state.radiiInput,
            this.state.category1,
            this.state.category2,
            this.state.category3).then(randomNumber => {
                this.setState({
                    randomNumber: randomNumber
                })
            }).then(() =>
                apiModule.getRandomRestaurant(
                    this.state.cityInput,
                    this.state.stateInput,
                    this.state.radiiInput,
                    this.state.category1,
                    this.state.category2,
                    this.state.category3,
                    this.state.randomNumber
                )).then((res) => {
                res.businesses[0].image_url !== "undefined" ? (
                    this.setState({
                        businessInfo: res.businesses,
                        businessImage: res.businesses[0].image_url
                    })
                ) : (
                        this.setState({
                            businessInfo: res.businesses,
                            businessImage: "Picture Unavailable"
                        })
                    )
                })
    }

    SurpriseSearch = () => {
        this.getAllRandomOffset(
            this.state.cityInput,
            this.state.stateInput,
            this.state.radiiInput).then(randomNumber => {
                this.setState({
                    randomNumber: randomNumber
                })
            }).then(() =>
                apiModule.getRandomSurpriseRestaurant(
                    this.state.cityInput,
                    this.state.stateInput,
                    this.state.radiiInput,
                    this.state.randomNumber
                )).then((res) => {
                res.businesses[0].image_url !== "undefined" ? (
                    this.setState({
                        businessInfo: res.businesses,
                        businessImage: res.businesses[0].image_url
                    })
                ) : (
                        this.setState({
                            businessInfo: res.businesses,
                            businessImage: "Picture Unavailable"
                        })
                    )
                })
    }

    getRandomNumber = (businesses) => Math.floor(Math.random() * businesses.total + 1)

    getRandomOffset = (city, state, radius, category1, category2, category3) =>
        apiModule.getRestaurantSearchTotal(city, state, radius, category1, category2, category3)
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
                    return <Login {...props} setActiveUser={this.setActiveUser} />
                }} />
                <Route exact path="/registration" render={(props) => {
                    return <Registration {...props} />
                }} />
                <Route exact path="/search" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <SearchForm
                            {...props}
                            categories={this.state.categories}
                            states={this.state.states}
                            radii={this.state.radii}
                            activeUser={this.props.activeUser}
                            getRandomOffset={this.getRandomOffset}
                            getAllRandomOffset={this.getAllRandomOffset}
                            updateUserState={this.updateUserState}
                            updateSurpriseUserState={this.updateSurpriseUserState}
                        />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />
                <Route exact path="/cardviewer" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <CardViewer
                            {...props}
                            businessInfo={this.state.businessInfo}
                            businessImage={this.state.businessImage}
                            activeUser={this.props.activeUser}
                            FoodSearch={this.FoodSearch}
                            SurpriseSearch={this.SurpriseSearch}
                        />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />
                <Route exact path="/restaurantinfo" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <MainRestaurantCard
                            {...props}
                            businessInfo={this.state.businessInfo}
                        />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />
            </React.Fragment>
        );
    }
}