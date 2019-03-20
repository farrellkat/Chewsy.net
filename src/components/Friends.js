import React, { Component } from "react"
import UserManager from "../modules/UserManager"
import { Card, CardTitle, CardText, CardImg, CardGroup, CardBody, Button, CardSubtitle } from 'reactstrap';
import Header from "../components/Header"
export default class Favorites extends Component {
    state = {
        favorites: [],
        friends: [],
    }
    favArray = []

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
                <div className="friendsBg" style={{ overflowY: "scroll" }}>
                    {/* <Header /> */}
                    <CardGroup className="favorites" style={{ margin: 20, justifyContent: "center" }}>
                        {
                            this.state.favorites.map(favorite =>
                                <Card key={favorite.restaurantId} id={favorite.id} style={{ maxWidth: 350, minWidth: 350, margin: 5 }}>
                                    <CardImg width="100%" src={favorite.image} />
                                    <CardBody>
                                        <CardTitle style={{ marginBottom: 0 }}><p className="favoritesName">{favorite.name}</p></CardTitle>
                                        <CardText style={{ textAlign: "center" }}>
                                            {favorite.category.map(category =>
                                                <small className="text-muted" style={{ textAlign: "center", marginBottom: 0 }}><i>{category.title}&nbsp;</i></small>
                                            )}
                                        </CardText>
                                        <CardText className="text-muted" style={{ textAlign: "center", marginTop: 0 }}>{favorite.price}</CardText>
                                        <CardSubtitle color="info" style={{ marginBottom: 10, textAlign: "center" }}>{favorite.user.firstName} {favorite.user.lastName} liked this!</CardSubtitle>
                                        <CardText><strong>Yelp rating: </strong>{favorite.rating}</CardText>
                                        <CardText><strong>My rating: </strong>{favorite.userRating}</CardText>
                                        <CardText style={{ marginBottom: 0 }}><strong>Address:</strong></CardText>
                                        <CardText>{favorite.location.address1}<br />
                                            {favorite.location.city}, {favorite.location.state} {favorite.location.zip_code}</CardText>
                                        <CardText><strong>Phone: </strong>{favorite.phone}</CardText>
                                        <CardText><strong>Website: </strong><a href={favorite.url} target="_blank">{favorite.name}</a></CardText>
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
                                </Card>
                            )
                        }
                    </CardGroup>
                </div>
            </React.Fragment>
        )
    }
}