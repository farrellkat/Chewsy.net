import React, { Component } from "react"
import { Button, Alert } from "reactstrap"
import UserManager from "../modules/UserManager"

export default class MainRestaurantCard extends Component {

        state = {
            favorites: [],
            visible: false,
            saveButton: "",
            favButtonValue: false
        }

        checkIfFavorite = (restaurantId) => {
            this.state.favorites.find((favorite) => {
                if(favorite.restaurantId === restaurantId) {
                    this.setState({
                        saveButton: <i class="far fa-star"></i>,
                        favButtonValue: true
                    })
                }
            })
        }

        saveFavoriteRestaurant = (userId, id, name, category, image, location, phone, rating, url, price) => {

            const favoriteRestaurant = {
                userId: userId,
                restaurantId: id,
                name: name,
                category: category,
                image: image,
                location: location,
                phone: phone,
                yelpRating: rating,
                url: url,
                price: price,
                notes: ""
            }
            this.props.postFavoriteRestaurant(favoriteRestaurant)
            this.setState({
                visible: true,
                saveButton: <i class="far fa-star"></i>,
                favButtonValue: true
            })
        }

        onDismiss = () => {
            this.setState({ visible: false });
        }

        componentDidMount() {
            UserManager.getUserFavorites(this.props.activeUser).then((favorites) => {
                this.setState({
                    favorites: favorites,
                    favButtonValue: false,
                    saveButton: "Save to your favorites",
                })
                    this.checkIfFavorite(this.props.businessInfo[0].id)
            })
}

    render() {
        // const activeUser = sessionStorage.getItem("credentials")
        return (
                <div className="cardHolderBg">
            <React.Fragment>
                <div className="mainRestaurantCardContainer">
                <Alert color="success" isOpen={this.state.visible} toggle={this.onDismiss}>
        Saved to your favorites!
      </Alert>

                <Button style={{marginBottom:10}}
                        color="info"
                        onClick={()=> {
                        this.props.foodSearch()
                        this.props.history.push("/cardviewer")}}>Still Hungry?</Button>
                <section className="restaurantInfoCardContainer">
                    <div className="restaurantInfoImageContainer">
                        <img
                            src={this.props.businessInfo[0].image_url}
                            alt="restaurant"
                            rel="noopener noreferrer"
                            className="restaurantInfoImage"></img>
                    </div>
                    <div style={{maxWidth:500}}className="restaurantInfoContainer">
                        <div className="mainCardHeader">
                            <h1 className="mainCardRestaurantName display-4 text-light">{this.props.businessInfo[0].name}</h1>
                            {this.props.businessInfo[0].categories.map(category =>
                                <small className="text-white"><i>{category.title}&nbsp;</i></small>
                            )}
                        </div>
                        <div className="MainCardAddressContainer text-light">
                            <div>Address:</div>
                            <a target="_blank" rel="noopener noreferrer" href={`https://maps.google.com/?q=${this.props.businessInfo[0].location.address1} ${this.props.businessInfo[0].location.city}, ${this.props.businessInfo[0].location.state} ${this.props.businessInfo[0].location.zip_code}`}
                            >
                                {this.props.businessInfo[0].location.address1}
                                <br/>
                                {this.props.businessInfo[0].location.city},&nbsp;
                                {this.props.businessInfo[0].location.state}&nbsp;
                                {this.props.businessInfo[0].location.zip_code}
                            </a>
                        </div>
                        <div className="additionalInfo text-light">
                            <div>Phone Number: {this.props.businessInfo[0].display_phone}</div>
                            <div>Business Website: <a href={this.props.businessInfo[0].url} target="_blank" rel="noopener noreferrer">{this.props.businessInfo[0].name}</a></div>
                        </div>
                        <div className="ratingAndPrice text-light">
                            {/* <div>Rating: {this.props.businessInfo[0].rating}/5</div> */}
                            <div>Price: {this.props.businessInfo[0].price}</div>
                        </div>
                    <div className="mainCardButtonContainer">
                        <Button
                            disabled={this.state.favButtonValue}
                            color="warning"
                            onClick={() =>
                                this.saveFavoriteRestaurant(
                                    this.props.activeUser,
                                    this.props.businessInfo[0].id,
                                    this.props.businessInfo[0].name,
                                    this.props.businessInfo[0].categories,
                                    this.props.businessInfo[0].image_url,
                                    this.props.businessInfo[0].location,
                                    this.props.businessInfo[0].display_phone,
                                    this.props.businessInfo[0].rating,
                                    this.props.businessInfo[0].url,
                                    this.props.businessInfo[0].price
                                    )
                            }>{this.state.saveButton}</Button>
                    </div>
                    </div>
                </section>
                <p style={{color: "white", fontSize:"-webkit-xxx-large"}}>HOORAY!</p>
                </div>
            </React.Fragment >
                </div>
        )
    }
}