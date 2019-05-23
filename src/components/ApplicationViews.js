import React, { Component } from "react"
import { Route, Redirect } from "react-router-dom"
import SearchForm from "./searchForm";
// import Login from "./authentication/Login"
import apiModule from "../modules/apiModule";
import Registration from "./authentication/Registration";
import CardViewer from "./CardViewer";
import MainRestaurantCard from "./MainRestaurantCard";
import ErrorBoundary from "./ErrorBoundary";
import UserManager from "../modules/UserManager"
import Favorites from "./favorites/Favorites";
import FavoriteEditForm from "./favorites/FavoriteEditForm";
import FindFriends from "./FindFriends";
import Friends from "./Friends";
import OneFriendFavorites from "./favorites/OneFriendFavorites";
import LoginAuth0 from "./authentication/LoginAuth0";
// import Profile from "./authentication/Profile";
import staticAppData from "../staticAppData"
// import errorPicture from "../img/errorPicture.png"
import history from "./History"
// import { timeout } from "q";
export default class ApplicationViews extends Component {

    constructor() {
        super();
        this.handleSwitchChange = this.handleSwitchChange.bind(this);
    }

    isAuthenticated() {
        // Check whether the current time is past the
        // access token's expiry time
        return localStorage.getItem('isLoggedIn')
        // let expiresAt = this.expiresAt;
        // return new Date().getTime() < expiresAt;
    }

    state = {
        activeUser: localStorage.getItem("userId"),
        states: staticAppData.states,
        radii: staticAppData.radius,
        randomNumber: "",
        category1: "",
        category2: "",
        category3: "",
        cityInput: "",
        stateInput: "",
        radiiInput: "",
        businessInfo: "",
        businessImage: "https://cdn.dribbble.com/users/989157/screenshots/4822481/food-icons-loading-animation.gif",
        randomNumberDiscards: [],
        userFavorites: [],
        checked: false,
        totalMatches: "",
        allRestaurants: []
    }

    setLocation = () => UserManager.get(this.state.activeUser).then((r) =>
        this.setState({
            userCity: r.city,
            userState: r.state,
            cityInput: r.city,
            stateInput: r.state
        }))

    setActiveUser = (userId) => {
        this.setState({
            activeUser: userId
        })
    }
    setFirstName = (firstName) => {
        this.setState({
            firstName: firstName
        })
    }

    clearActiveUser = () => this.setState({ activeUser: "" })

    postFavoriteRestaurant = (favoriteRestaurant) => {
        UserManager.addUserFavorite(favoriteRestaurant)
    }

    handleSwitchChange(checked) {
        this.setState({ checked });
    }

    saveFavoriteRestaurant = (userId, id, name, image, location, phone, rating) => {
        const favoriteRestaurant = {
            userId: userId,
            id: id,
            name: name,
            image: image,
            location: location,
            phone: phone,
            yelpRating: rating
        }
        this.postFavoriteRestaurant(favoriteRestaurant)
    }

    gatherRestaurants = (totalRestaurantsArray, city, state, offset) => {

            apiModule.getAllRestaurantsInCityOffset(city, state, offset)
                .then((r) => {
                    totalRestaurantsArray.push(r)
                })
            offset = (offset + 51)
    }

    importUsersHomeRestaurants = (userId) => {
        UserManager.getUserById(userId)
            .then((u) => {
                apiModule.getAllRestaurantsInCity(u.city, u.state)
                    .then((r) => {
                        // debugger
                        const newState = {}
                        // const totalRestaurants = r.total
                        // const iterationCount = (totalRestaurants / 50)
                        const totalRestaurantsArray = []
                        let offset = 0

                        var i = 1;                     //  set your counter to 1

                        function myLoop () {           //  create a loop function
                           setTimeout(function () {    //  call a random setTimeout when the loop is called
                            apiModule.getAllRestaurantsInCityOffset(u.city, u.state, offset)
                            .then((r) => {
                                r.businesses.forEach(b => {
                                    //build for each loop for each category
                                    for (let i = 0; i<b.categories.length; i++){
                                  const categories = b.categories[i]
                                //   console.log(categories)
                                  totalRestaurantsArray.push(categories)
                                }
                            })
                        })
                        offset = (offset + 51)
                        i++;                     //  increment the counter
                        if (i < 20) {            //  if the counter < 10, call the loop function
                            myLoop();             //  ..  again which will trigger another
                        }                        //  ..  setTimeout()
                    }, ((Math.floor(Math.random() * 1) + 1 ) * 1000))
                }
                myLoop();
                        newState.allRestaurants = totalRestaurantsArray
                        newState.activeUser = userId
                        this.setState(newState)
                    })
            })
    }


    componentDidMount() {
        // const newState = {}
        const userId = parseInt(localStorage.getItem("userId"))
        // this.setState(newState)
        this.importUsersHomeRestaurants(userId)


    }



    updateUserState = (category1, category2, category3, cityInput, stateInput, radiiInput) => {
        this.setState({
            category1: category1,
            category2: category2,
            category3: category3,
            cityInput: cityInput,
            stateInput: stateInput,
            radiiInput: radiiInput,
            randomNumberDiscards: [],
            totalMatches: "",
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
            randomNumberDiscards: [],
            totalMatches: "",
            businessImage: "https://cdn.dribbble.com/users/989157/screenshots/4822481/food-icons-loading-animation.gif"
        }, () => this.SurpriseSearch());
    };

    FoodSearch = () => {
        this.getRandomOffset(
            this.state.cityInput,
            this.state.stateInput,
            // this.state.radiiInput,
            this.state.category1,
            this.state.category2,
            this.state.category3,
            this.state.randomNumberDiscards)
            .then(() => {
                this.setState({
                    businessImage: "https://cdn.dribbble.com/users/989157/screenshots/4822481/food-icons-loading-animation.gif"
                })
            }).then(() =>
            apiModule.getRandomRestaurant(
                this.state.cityInput,
                this.state.stateInput,
                this.state.category1,
                this.state.category2,
                this.state.category3,
                this.state.randomNumber
                )).then((res) => {
                    if (res.error) { return }
                    if (res.businesses.length === 0 || res.businesses[0].image_url === "") {
                        this.FoodSearch()

                    } else {
                        this.setState({
                            businessInfo: res.businesses,
                            businessImage: res.businesses[0].image_url
                        })
                    }
                })
    }

    SurpriseSearch = () => {
        this.getAllRandomOffset(
            this.state.cityInput,
            this.state.stateInput,
            // this.state.radiiInput,
            this.state.randomNumberDiscards
        ).then(() => {
            this.setState({
                businessImage: "https://cdn.dribbble.com/users/989157/screenshots/4822481/food-icons-loading-animation.gif"
            })
        }).then(() =>
            apiModule.getRandomSurpriseRestaurant(
                this.state.cityInput,
                this.state.stateInput,
                // this.state.radiiInput,
                this.state.randomNumber
            )).then((res) => {
                if (res.error) { return }
                if (res.businesses.length === 0 || res.businesses[0].image_url === "") {
                    this.SurpriseSearch()

                } else {
                    this.setState({
                        businessInfo: res.businesses,
                        businessImage: res.businesses[0].image_url
                    })
                }
            })
    }

    getRandomNumber = (businesses, randomNumberDiscardArray) => {
        if (this.state.totalMatches > 0) {
            if (businesses.total < 1000 && businesses.total > 0) {
                const randomNumber = Math.floor(Math.random() * businesses.total + 1)
                if (randomNumberDiscardArray.indexOf(randomNumber) === -1) {
                    this.setState({
                        randomNumber: randomNumber,
                        totalMatches: (this.state.totalMatches - 1)
                    })
                } else {
                    this.getRandomNumber(businesses, randomNumberDiscardArray)
                }
            }
            else if (businesses.total > 1000) {
                const total = 1000
                const randomNumber = Math.floor(Math.random() * total + 1)
                if (randomNumberDiscardArray.indexOf(randomNumber) === -1) {
                    this.setState({
                        randomNumber: randomNumber,
                        totalMatches: (this.state.totalMatches - 1)
                    })
                } else {
                    this.getRandomNumber(businesses, randomNumberDiscardArray)
                }
            }
            else {
                alert("no matches found")
                history.push("/search")
                return
            }
        }
        else {
            alert("That's all folks")
            history.push("/search")
            this.setState({ totalMatches: "" })
            return
        }
    }

    getRandomOffset = (city, state, category1, category2, category3, randomNumberDiscardArray) =>
        apiModule.getRestaurantSearchTotal(city, state, category1, category2, category3)
            .then((b) => {
                const businessArray = b
                if (this.state.totalMatches === "") {
                    if (businessArray.total > 1000) {
                        this.setState({ totalMatches: 999 })
                    } else {
                        this.setState({ totalMatches: businessArray.total - 1 })
                    }
                }
                this.getRandomNumber(businessArray, randomNumberDiscardArray)
                if (randomNumberDiscardArray.length) {
                    randomNumberDiscardArray.push(this.state.randomNumber)
                    this.setState({
                        randomNumberDiscards: randomNumberDiscardArray

                    })
                }
                else {
                    randomNumberDiscardArray.push(this.state.randomNumber)
                }
            })

    getAllRandomOffset = (city, state, randomNumberDiscardArray) =>
        apiModule.getTotalRestaurants(city, state)
            .then((b) => {
                const businessArray = b
                if (this.state.totalMatches === "") {
                    if (businessArray.total > 1000) {
                        this.setState({ totalMatches: 1000 })
                    } else {
                        this.setState({ totalMatches: businessArray.total - 1 })
                    }
                }
                this.getRandomNumber(businessArray, randomNumberDiscardArray)
                if (randomNumberDiscardArray.length) {
                    randomNumberDiscardArray.push(this.state.randomNumber)
                    this.setState({
                        randomNumberDiscards: randomNumberDiscardArray

                    })
                }
                else {
                    randomNumberDiscardArray.push(this.state.randomNumber)
                }
            })

    render() {
        return (
            <React.Fragment>
                <Route exact path="/" render={(props) => {
                    return <LoginAuth0 {...props}
                        auth={this.props.auth}
                        setActiveUser={this.setActiveUser}
                        setFirstName={this.setFirstName}
                        firstName={this.state.firstName}
                    />
                }
                }
                />
                <Route exact path="/registration" render={(props) => {
                    return <Registration {...props}
                        activeUser={this.state.activeUser}
                        setActiveUser={this.setActiveUser}
                        states={this.state.states} />
                }} />
                <Route exact path="/search" render={(props) => {
                    // if (this.isAuthenticated()) {
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
                        allRestaurants={this.state.allRestaurants}
                    />
                    // } else {
                    // return <Redirect to="/" />
                    // }

                }} />
                <Route exact path="/cardviewer" render={(props) => {
                    // if (this.isAuthenticated()) {
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
                        return <Redirect to="/" />
                    }
                }} />
                <Route exact path="/restaurantinfo" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <MainRestaurantCard
                            {...props}
                            foodSearch={this.FoodSearch}
                            businessInfo={this.state.businessInfo}
                            businessId={this.businessId}
                            postFavoriteRestaurant={this.postFavoriteRestaurant}
                            activeUser={this.state.activeUser}
                        />
                    } else {
                        return <Redirect to="/" />
                    }
                }} />
                <Route exact path="/favorites" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <Favorites
                            {...props}
                            checked={this.state.checked}
                            handleSwitchChange={this.handleSwitchChange}
                            activeUser={this.state.activeUser}
                            userFavorites={this.state.userFavorites}
                        >
                        </Favorites>
                    } else {
                        return <Redirect to="/" />
                    }
                }} />
                <Route exact path="/findfriends" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <FindFriends
                            {...props}
                            activeUser={this.state.activeUser}
                            userFavorites={this.state.userFavorites}
                            friends={this.state.friends}
                        >
                        </FindFriends>
                    } else {
                        return <Redirect to="/" />
                    }
                }} />
                <Route exact path="/friends" render={(props) => {
                    if (this.isAuthenticated()) {
                        return <Friends
                            {...props}
                            checked={this.state.checked}
                            handleSwitchChange={this.handleSwitchChange}
                            activeUser={this.state.activeUser}
                            userFavorites={this.state.userFavorites}
                            friends={this.state.friends}
                        >
                        </Friends>
                    } else {
                        return <Redirect to="/" />
                    }
                }} />
                <Route path="/favorites/:favoriteId(\d+)/edit" render={props => {
                    return <FavoriteEditForm
                        {...props}
                    />
                }}
                />
                <Route path="/favorites/:friendId(\d+)/friendfavorite" render={props => {
                    return <OneFriendFavorites
                        {...props}
                        checked={this.state.checked}
                        handleSwitchChange={this.handleSwitchChange}
                    />
                }}
                />
            </React.Fragment>
        );
    }
}