import React, { Component } from "react"
import UserManager from "../modules/UserManager"
import { Card, CardTitle, CardText, CardImg, CardGroup, CardBody, Button} from 'reactstrap';

export default class Favorites extends Component {
    state = {
        favorites: [],
        stars: [1, 2, 3, 4, 5]
    }

deleteFavorite = (id) => {
    UserManager.deleteFavorite(id)
    .then(()=> UserManager.getUserFavorites(this.props.activeUser)
    .then((favorites) => {
        this.setState({
            favorites: favorites
        })
    }))
}

    componentDidMount() {
            UserManager.getUserFavorites(this.props.activeUser).then((favorites) => {
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
                                <CardText><strong>Yelp rating: </strong>{favorite.rating}</CardText>
                                <CardText><strong>My rating: </strong>{favorite.userRating}</CardText>
                                <CardText style={{marginBottom:0}}><strong>Address:</strong></CardText>
                                <CardText>{favorite.location.address1}<br/>
                                {favorite.location.city}, {favorite.location.state} {favorite.location.zip_code}</CardText>
                                <CardText><strong>Phone:</strong>{favorite.phone}</CardText>
                                <CardText style={{marginBottom: 0}}><strong>Notes:</strong></CardText>
                                <CardText>{favorite.notes}</CardText>
                                <Button
                                color="primary"
                                style={{marginRight: 10}}
                                onClick={()=>this.props.history.push(`/favorites/${favorite.id}/edit`)}
                                >Add Note</Button>
                                <Button color="danger" onClick={() => this.deleteFavorite(favorite.id)}>Remove</Button>
                            </CardBody>
                        </Card>
                    )
                }
            </CardGroup>
        )
    }
}