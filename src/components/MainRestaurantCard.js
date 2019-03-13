import React, { Component } from "react"
import {Button} from "reactstrap"

export default class MainRestaurantCard extends Component {

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
        this.props.postFavoriteRestaurant(favoriteRestaurant)
        this.props.history.push("/favorites")
    }

    state = {
        favorites: [],
        activeUser: parseInt("")
    }

    componentDidMount() {
            this.props.checkUserId()
    }

    render() {
        // const activeUser = sessionStorage.getItem("credentials")
        return (
            <React.Fragment>
                <section className="restaurantInfoCardContainer">
                    <div className="restaurantInfoImageContainer">
                        <img
                            src={this.props.businessInfo[0].image_url}
                            alt="restaurant"
                            rel="noopener noreferrer"
                            className="restaurantInfoImage"></img>
                    </div>
                    <div className="restaurantInfoContainer">
                        <div className="mainCardHeader">
                            <h1 className="mainCardRestaurantName display-4 text-light">{this.props.businessInfo[0].name}</h1>
                            {this.props.businessInfo[0].categories.map(category =>
                                <small className="text-muted"><i>{category.title}&nbsp;</i></small>
                                )}
                        </div>
                        <div className="MainCardAddressContainer text-light">
                            <div>Address:</div>
                            <div>
                                {this.props.businessInfo[0].location.address1}
                            </div>
                            <div>
                                {this.props.businessInfo[0].location.city},&nbsp;
                                {this.props.businessInfo[0].location.state}&nbsp;
                                {this.props.businessInfo[0].location.zip_code}
                            </div>
                        </div>
                        <div className="additionalInfo text-light">
                            <div>Phone Number: {this.props.businessInfo[0].display_phone}</div>
                            <div>Business Website: <a href={this.props.businessInfo[0].url} target="_blank">{this.props.businessInfo[0].name}</a></div>
                        </div>
                        <div className="ratingAndPrice text-light">
                            <div>Rating: {this.props.businessInfo[0].rating}/5</div>
                            <div>Price: {this.props.businessInfo[0].price}</div>
                        </div>
                    </div>
                    <div className="mainCardButtonContainer">
                    <Button
                    color="warning"
                    onClick={()=>
                    this.saveFavoriteRestaurant(
                        this.props.activeUser,
                        this.props.businessInfo[0].id,
                        this.props.businessInfo[0].name,
                        this.props.businessInfo[0].image_url,
                        this.props.businessInfo[0].location,
                        this.props.businessInfo[0].display_phone,
                        this.props.businessInfo[0].rating,
                        this.props.businessInfo[0].url,
                        this.props.businessInfo[0].price)
                    }>Save to Favorites</Button>
                    </div>
                </section>
            </React.Fragment >
        )
    }
}