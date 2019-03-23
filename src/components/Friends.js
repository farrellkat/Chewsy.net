import React, { Component } from "react"
import UserManager from "../modules/UserManager"
import { Card, CardTitle, CardText, CardImg, CardGroup, CardBody, Button, CardSubtitle } from 'reactstrap';
import Ratings from "react-ratings-declarative"
import Masonry from "react-masonry-component"

const masonryOptions = {
    transitionDuration: '0.8s',
    fitWidth: true
};

const imagesLoadedOptions = { background: '.my-bg-image-el' }
export default class Favorites extends Component {
    state = {
        favorites: [],
        friends: [],
        isHidden: true
    }
    favArray = []

    toggleHidden() {
        this.setState({
            isHidden: !this.state.isHidden
        })
    }

    loadFriends = () => {
        this.setState({
            favorites: [],
            friends: []
        })
        this.props.checkUserId()
        UserManager.getAllFriends(this.props.activeUser)
            .then((friends) => this.setState({
                friends: friends
            }))
            .then(() => UserManager.getAllFavorites())
            .then((favorites) => {
                const friendId = this.state.friends.map((friend) => friend.fId)
                friendId.map((id) =>
                    (favorites.filter((favorite) => id === favorite.userId).map((favorite) => this.favArray.push(favorite))))
                this.setState({ favorites: this.favArray })
            })
    }

    componentDidMount() {
        console.log(this.props.activeUser)
        this.loadFriends()
    }

    // componentDidUpdate(prevProps) {
    //     console.log(this.props.activeUser)
    //     // Typical usage (don't forget to compare props):
    //     if (this.props.activeUser !== prevProps.activeUser) {
    //         this.loadFriends()
    //     }
    // }

    render() {
        return (
            // this.state.favorites.length ?
            <React.Fragment>
                <div className="friendsBg" style={{ overflowY: "scroll"}}>
                    {/* <CardGroup className="favorites" style={{ margin: 20, justifyContent: "center", alignItems: "flex-start" }}> */}
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
                                    <CardImg
                                        width="100%"
                                        src={favorite.image}
                                        onClick={this.toggleHidden.bind(this)}
                                    />
                                    <div>
                                        {!this.state.isHidden &&
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
                                                <div className="friendButtonContainer">
                                                    <Button
                                                        color="primary"
                                                        style={{ marginRight: 10 }}
                                                        onClick={() => this.props.history.push(`/favorites/${favorite.userId}/friendfavorite`)}
                                                    >See more of {favorite.user.firstName}'s favorites</Button>
                                                </div>
                                            </CardBody>
                                        }</div>
                                </Card>
                            )
                        }
                        </Masonry>
                        </div>
                    {/* </CardGroup> */}
            </React.Fragment>
        )
    }
}