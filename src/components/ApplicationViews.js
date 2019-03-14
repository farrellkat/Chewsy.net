import React, { Component } from "react"
import { Route, Redirect } from "react-router-dom"
import SearchForm from "./searchForm";
import Login from "./authentication/Login"
import apiModule from "../modules/apiModule";
import Registration from "./authentication/Registration";
import CardViewer from "./CardViewer";
import MainRestaurantCard from "./MainRestaurantCard";
import ErrorBoundary from "./ErrorBoundary";
import UserManager from "../modules/UserManager"
import Favorites from "./Favorites";
export default class ApplicationViews extends Component {

    isAuthenticated = () => (sessionStorage.getItem("credentials") !== null || localStorage.getItem("credentials") !== null)

    state = {
        categories: [],
        activeUser: parseInt(""),
        userCity: "",
        userState: "",
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
        userFavorites: []
    }

    setLocation = () => UserManager.get(this.state.activeUser).then((r) =>
        this.setState({
            userCity: r.city,
            userState: r.state,
            cityInput: r.city,
            stateInput: r.state
        }))

    setActiveUser = (id) => {
        this.setState({
            activeUser: parseInt(id)
        })
    }

    checkUserId = () => {
            if (sessionStorage.getItem("credentials") !== "") {
                this.setState({ activeUser: parseInt(sessionStorage.getItem("credentials")) })
            } else {
                this.setState({activeUser: parseInt(localStorage.getItem("credentials")) })
            }
    }

    postFavoriteRestaurant = (favoriteRestaurant) => {
        UserManager.addUserFavorite(favoriteRestaurant)
    }

    saveFavoriteRestaurant = (userId, id, name, image, location, phone, rating) => {
        const favoriteRestaurant = {
            userId: userId,
            id: id,
            name: name,
            image: image,
            location: location,
            phone: phone,
            rating: rating
        }
        this.postFavoriteRestaurant(favoriteRestaurant)
    }
    componentDidMount() {
        const newState = {}
        apiModule.getAllCategories().then(allCategories => {
            this.setState({
                categories: allCategories
            })
        })
            .then(() =>
                this.setState(newState))
            .then(() =>
                apiModule.getAllStates()).then(allStates => {
                    this.setState({
                        states: allStates
                    })
                })
            .then(() =>
                apiModule.getAllRadii()).then(allRadii => {
                    this.setState({
                        radii: allRadii
                    })
                })
            .then(() =>
                this.setState({
                    businessImage: "https://cdn.dribbble.com/users/989157/screenshots/4822481/food-icons-loading-animation.gif"
                }))
    }

    updateUserState = (category1, category2, category3, cityInput, stateInput, radiiInput) => {
        this.setState({
            category1: category1,
            category2: category2,
            category3: category3,
            cityInput: cityInput,
            stateInput: stateInput,
            radiiInput: radiiInput,
            businessImage: "https://cdn.dribbble.com/users/989157/screenshots/4822481/food-icons-loading-animation.gif"
        }, () => this.FoodSearch());
    };
    updateSurpriseUserState = (category1, category2, category3, cityInput, stateInput, radiiInput) => {
        this.setState({
            category1: category1,
            category2: category2,
            category3: category3,
            cityInput: cityInput,
            stateInput: stateInput,
            radiiInput: radiiInput,
            businessImage: "https://cdn.dribbble.com/users/989157/screenshots/4822481/food-icons-loading-animation.gif"
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
                    randomNumber: randomNumber,
                    businessImage: "https://cdn.dribbble.com/users/989157/screenshots/4822481/food-icons-loading-animation.gif"
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
                console.log(randomNumber)
                this.setState({
                    randomNumber: randomNumber,
                    businessImage: "https://cdn.dribbble.com/users/989157/screenshots/4822481/food-icons-loading-animation.gif"
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

    getRandomNumber = (businesses) => {
        if (businesses.total < 1000) {
            return Math.floor(Math.random() * businesses.total + 1)
        } else {
            const total = 999
            return Math.floor(Math.random() * total + 1)
        }
    }

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
                    return <Login {...props}
                        setActiveUser={this.setActiveUser}
                        setLocation={this.setLocation}
                        activeUser={this.state.activeUser} />
                }} />
                <Route exact path="/registration" render={(props) => {
                    return <Registration {...props} />
                }} />
                <Route exact path="/search" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <SearchForm
                            {...props}
                            userCity={this.state.userCity}
                            userState={this.state.userState}
                            categories={this.state.categories}
                            states={this.state.states}
                            radii={this.state.radii}
                            activeUser={this.state.activeUser}
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
                        return <ErrorBoundary>
                            <CardViewer
                                {...props}
                                businessInfo={this.state.businessInfo}
                                businessImage={this.state.businessImage}
                                activeUser={this.props.activeUser}
                                FoodSearch={this.FoodSearch}
                                SurpriseSearch={this.SurpriseSearch}
                            />
                        </ErrorBoundary>
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />
                <Route exact path="/restaurantinfo" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <MainRestaurantCard
                            {...props}
                            businessInfo={this.state.businessInfo}
                            businessId={this.businessId}
                            postFavoriteRestaurant={this.postFavoriteRestaurant}
                            activeUser={this.state.activeUser}
                            checkUserId={this.checkUserId}
                        />
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />
                <Route exact path="/favorites" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <Favorites
                            {...props}
                            activeUser={this.state.activeUser}
                            userFavorites={this.state.userFavorites}
                        >
                        </Favorites>
                    } else {
                        return <Redirect to="/login" />
                    }
                }} />
            </React.Fragment>
        );
    }
}