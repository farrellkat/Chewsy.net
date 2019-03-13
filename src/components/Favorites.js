import React, { Component } from "react"
import UserManager from "../modules/UserManager"
import { Card, CardTitle, CardText, CardImg, CardGroup, CardBody, CardSubtitle, Button } from 'reactstrap';

export default class Favorites extends Component {
    state = {
        favorites: [],
        activeUser: ""
    }

    componentDidMount() {
        UserManager.getUserFavorites(this.props.activeUser).then((favorites) => {
            this.setState({
                favorites: favorites
            })
        }).then(()=>{
            this.props.checkUserId()
        })
    }

    render() {
        console.log(this.state.favorites)
        return (
            <CardGroup className="favorites">
                {
                    this.state.favorites.map(favorite =>
                        <Card>
                            <CardImg top width="100%" src={favorite.image} />
                            <CardBody>
                                <CardTitle>{favorite.name}</CardTitle>
                                <CardSubtitle>{favorite.rating}</CardSubtitle>
                                <CardText></CardText>
                                <CardText>{favorite.location.address1}<br/>
                                {favorite.location.city}, {favorite.location.state} {favorite.location.zip_code}</CardText>
                                <CardText>{favorite.phone}</CardText>
                                <Button>Button</Button>
                            </CardBody>
                        </Card>
                    )
                }
            </CardGroup>
        )
    }
}