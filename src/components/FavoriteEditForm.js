import React, { Component } from "react"
import UserManager from "../modules/UserManager"
import { Card, CardTitle, CardText, CardImg, CardGroup, CardBody, CardSubtitle, Button, Input } from 'reactstrap';

export default class FavoriteEditForm extends Component {
  // Set initial state
  state = {
  }

  cardId = this.props.match.params.favoriteId

  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  updateFavorite = evt => {
    evt.preventDefault()

    const editedCard = {
      notes: this.state.notes
    };

    UserManager.updateFavorite(this.cardId, editedCard)
      .then(() => this.props.history.push("/favorites"))

  }

  componentDidMount() {
    UserManager.getOneUserFavorite(this.props.match.params.favoriteId)
      .then(restaurant => {
        this.setState({
          name: restaurant.name,
          image: restaurant.image,
          Address1: restaurant.location.address1,
          city: restaurant.location.city,
          state: restaurant.location.state,
          zip_code: restaurant.location.zip_code,
          phone: restaurant.phone,
          restaurantId: restaurant.restaurantId,
          userId: restaurant.userId,
          id: restaurant.id,
          rating: restaurant.rating,
          notes: ""
        });
      });
  }


  render() {
    return (
      <React.Fragment>
        <CardGroup className="favorites" style={{ margin: 20, justifyContent: "center" }}>
          {
            <Card key={this.state.restaurantId} id={this.state.id} style={{ maxWidth: 350, minWidth: 350, margin: 5 }}>
              <CardImg width="100%" src={this.state.image} />
              <CardBody>
                <CardTitle style={{ marginBottom: 10 }}><h4>{this.state.name}</h4></CardTitle>
                <CardSubtitle><strong>Rating: </strong>{this.state.rating}</CardSubtitle>
                <CardText style={{ marginBottom: 0 }}><strong>Address:</strong></CardText>
                <CardText>{this.state.address1}<br />
                  {this.state.city}, {this.state.state} {this.state.zip_code}</CardText>
                <CardText><strong>Phone:</strong>{this.state.phone}</CardText>
                <CardText><strong>Notes:</strong></CardText>
                <div className="form-group">
                  <Input defaultValue={this.state.notes} type="textarea" name="text" id="notes" onChange={this.handleFieldChange}/>
                </div>
                <Button
                  color="primary"
                  type="submit"
                  onClick={this.updateFavorite}
                  className="btn btn-primary"
                >
                  Submit
            </Button>
              </CardBody>
            </Card>
          }
        </CardGroup>
      </React.Fragment>
    );
  }
}