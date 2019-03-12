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
                </section>
            </React.Fragment >
        )
    }
}