import React, { Component } from "react"
import UserManager from "../../modules/UserManager"
import { Card, CardTitle, CardText, CardImg, CardGroup, CardBody, CardSubtitle } from 'reactstrap';

export default class OneFriendFavorites extends Component {
    state = {
        favorites: [],
    }

    componentDidMount() {
        UserManager.getUserFavorites(this.props.match.params.friendId).then((favorites) => {
            this.setState({
                favorites: favorites
            })
            })
        }

        render() {
            return (
                <CardGroup className="favorites" style={{margin:20, justifyContent:"center"}}>
                {
                    this.state.favorites.map(favorite =>
                        <Card key={favorite.restaurantId} id={favorite.id} style={{maxWidth:350, minWidth:350, margin:5}}>
                            <CardImg width="100%" src={favorite.image} />
                            <CardBody>
                                <CardTitle style={{marginBottom:10}}><h4>{favorite.name}</h4></CardTitle>
                                <CardSubtitle color="info" style={{ marginBottom: 10 }}>{favorite.user.firstName} {favorite.user.lastName} liked this</CardSubtitle>
                                <CardText><strong>Yelp rating: </strong>{favorite.rating}</CardText>
                                <CardText><strong>{favorite.user.firstName}'s rating: </strong>{favorite.userRating}</CardText>
                                <CardText style={{marginBottom:0}}><strong>Address:</strong></CardText>
                                <CardText>{favorite.location.address1}<br/>
                                {favorite.location.city}, {favorite.location.state} {favorite.location.zip_code}</CardText>
                                <CardText><strong>Phone:</strong>{favorite.phone}</CardText>
                                <CardText style={{marginBottom: 0}}><strong>Notes:</strong></CardText>
                                <CardText>{favorite.notes}</CardText>
                            </CardBody>
                        </Card>
                    )
                }
            </CardGroup>
        )
    }
}