import React, { Component } from "react"
import UserManager from "../../modules/UserManager"
import { Card, CardTitle, CardText, CardImg, CardBody, Button, CardSubtitle } from 'reactstrap';
import Ratings from "react-ratings-declarative"
import Masonry from "react-masonry-component"
import Switch from "react-switch"

const masonryOptions = {
    transitionDuration: '0.8s',
    fitWidth: true,
};

const imagesLoadedOptions = { background: '.my-bg-image-el' }
export default class OneFriendFavorites extends Component {
    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
    }


    state = {
        favorites: [],
        checked: false
    }
    handleChange(checked) {
        this.setState({ checked });
    }


    componentDidMount() {
        UserManager.getUserFavorites(this.props.match.params.friendId).then((favorites) => {
            this.setState({
                favorites: favorites,
                friendName: favorites[0].user.firstName
            })
        })
    }

    render() {
        console.log(this.state.favorites)
        return (
            <React.Fragment>
                <div className="friendsBg" style={{ overflowY: "scroll" }}>
                <div className="stickyHeader">
                    <h1 style={{ textAlign: "center", color: "white", marginLeft:"40px" }}>{this.state.friendName}'s Favorites</h1>
                    <label style={{ display: "flex", color:"white", alignItems:"center", marginRight:"40px" }}>
                        <span style={{marginRight:"10px"}}>{`${(this.state.checked) ? `Hide details` : `Show details`}`}</span>
                            <Switch onChange={this.handleChange} checked={this.state.checked} />
                    </label>
                        </div>
                    <div className="oneFriendTopButtonDiv">
                        <Button
                            style={{ marginTop: "20px", marginBottom: "20px" }}
                            color="info"
                            onClick={() => this.props.history.push("/friends")}
                        >Back</Button>
                    </div>
                    {/* <CardGroup className="favorites" style={{ margin: 20, justifyContent: "center", alignItems:"flex-start" }}> */}
                    <Masonry
                        className={'my-gallery-class'} // default ''
                        elementType={'ul'} // default 'div'
                        options={masonryOptions} // default {}
                        disableImagesLoaded={false} // default false
                        updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                        imagesLoadedOptions={imagesLoadedOptions} // default {}
                    >
                        {
                            this.state.favorites.map(favorite =>
                                <Card key={favorite.restaurantId} id={favorite.id} style={{ maxWidth: 350, minWidth: 350, margin: 5, padding: "5px" }}>
                                    <CardImg width="100%" src={favorite.image} />
                                    <div>
                                        {this.state.checked &&
                                            <CardBody>
                                                <CardTitle style={{ marginBottom: 0 }}><p className="favoritesName">{favorite.name}</p></CardTitle>
                                                <CardText style={{ textAlign: "center" }}>
                                                    {favorite.category.map(category =>
                                                        <small className="text-muted" style={{ textAlign: "center", marginBottom: 0 }}><i>{category.title}&nbsp;</i></small>
                                                    )}
                                                </CardText>
                                                <CardText className="text-muted" style={{ textAlign: "center", marginTop: 0 }}>{favorite.price}</CardText>
                                                <CardSubtitle color="info" style={{ marginBottom: 10, textAlign: "center" }}>{favorite.user.firstName} {favorite.user.lastName} liked this!</CardSubtitle>
                                                <CardText style={{ marginBottom: "0px", textAlign: "center" }}><strong>Yelp rating:</strong></CardText>
                                                <div className="favoritePageRatings">
                                                    <Ratings
                                                        rating={favorite.yelpRating}
                                                        widgetDimensions="30px"
                                                        widgetSpacings="5px"
                                                        widgetRatedColors="darkred"
                                                    >
                                                        <Ratings.Widget />
                                                        <Ratings.Widget />
                                                        <Ratings.Widget />
                                                        <Ratings.Widget />
                                                        <Ratings.Widget />
                                                    </Ratings>
                                                </div>
                                                <CardText style={{ marginBottom: "0px", textAlign: "center" }}><strong>{favorite.user.firstName}'s rating:</strong></CardText>
                                                <div className="favoritePageRatings">
                                                    <Ratings
                                                        rating={favorite.rating}
                                                        widgetDimensions="30px"
                                                        widgetSpacings="5px"
                                                        widgetRatedColors="goldenrod"
                                                    >
                                                        <Ratings.Widget />
                                                        <Ratings.Widget />
                                                        <Ratings.Widget />
                                                        <Ratings.Widget />
                                                        <Ratings.Widget />
                                                    </Ratings>
                                                </div>
                                                <CardText style={{ marginBottom: 0 }}><strong>Address:</strong></CardText>
                                                <CardText>{favorite.location.address1}<br />
                                                    {favorite.location.city}, {favorite.location.state} {favorite.location.zip_code}</CardText>
                                                <CardText><strong>Phone: </strong>{favorite.phone}</CardText>
                                                <CardText><strong>Website: </strong><a href={favorite.url} target="_blank" rel="noopener noreferrer">{favorite.name}</a></CardText>
                                                <div className="favNotes">
                                                    <CardText style={{ marginBottom: 0 }}><strong>Notes:</strong></CardText>
                                                    <CardText>{favorite.notes}</CardText>
                                                </div>
                                            </CardBody>
                                        }
                                    </div>
                                </Card>
                            )
                        }
                    </Masonry>
                    {/* </CardGroup> */}
                </div>
            </React.Fragment>
        )
    }
}