import React, { Component } from "react"
import UserManager from "../modules/UserManager"
import { Card, CardTitle, CardText, CardImg, CardGroup, CardBody, CardSubtitle, Button} from 'reactstrap';
import { wrap } from "module";

export default class Favorites extends Component {
    state = {
        favorites: [],
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
        console.log(this.state.favorites)
        return (
            <CardGroup className="favorites" style={{margin:20, justifyContent:"center"}}>
                {
                    this.state.favorites.map(favorite =>
                        <Card key={favorite.restaurantId} id={favorite.id} style={{maxWidth:350, minWidth:350, margin:5}}>
                            <CardImg width="100%" src={favorite.image} />
                            <CardBody>
                                <CardTitle style={{marginBottom:10}}><h4>{favorite.name}</h4></CardTitle>
                                <CardSubtitle><strong>Rating: </strong>{favorite.rating}</CardSubtitle>
                                <CardText style={{marginBottom:0}}><strong>Address:</strong></CardText>
                                <CardText>{favorite.location.address1}<br/>
                                {favorite.location.city}, {favorite.location.state} {favorite.location.zip_code}</CardText>
                                <CardText><strong>Phone:</strong>{favorite.phone}</CardText>
                                <Button color="primary" style={{marginRight: 10}}>Add Note</Button>
                                <Button color="danger" onClick={() => this.deleteFavorite(favorite.id)}>Remove</Button>
                            </CardBody>
                        </Card>
                    )
                }
            </CardGroup>
        )
    }
}