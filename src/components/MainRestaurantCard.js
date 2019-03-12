import React, { Component } from "react"

export default class MainRestaurantCard extends Component {
    render() {
        console.log(this.props.businessInfo)
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
                <h1>{this.props.businessInfo[0].name}</h1>
                <div>Rating: {this.props.businessInfo[0].rating}/5</div>
                <div>Price: {this.props.businessInfo[0].price}</div>
                {/* <div>location: {this.props.businessInfo[0].location}</div> */}
                <div><a href={this.props.businessInfo[0].url} target="_blank">Visit {this.props.businessInfo[0].name} on Yelp.</a></div>
                </div>
                </section>
            </React.Fragment>
        )
    }
}