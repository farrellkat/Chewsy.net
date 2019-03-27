import React, { Component } from "react"
import UserManager from "../../modules/UserManager"
import { Card, CardTitle, CardText, CardImg, CardGroup, CardBody, CardSubtitle, Button, Input, Label } from 'reactstrap';
import Ratings from 'react-ratings-declarative';
export default class FavoriteEditForm extends Component {
  // Set initial state
  state = {
    userRating: ""
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
      notes: this.state.notes,
      rating: this.state.rating
    };

    UserManager.updateFavorite(this.cardId, editedCard)
      .then(() => this.props.history.push("/favorites"))
  }

  changeRating = (newRating) => {
    this.setState({
      rating: newRating
    });
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
          yelpRating: restaurant.yelpRating,
          notes: restaurant.notes,
          rating: restaurant.rating
        })
      })
  }


  render() {
    return (
      <React.Fragment>
        <CardGroup className="favorites" style={{ margin: 20, justifyContent: "center" }}>
          {
            <Card key={this.state.restaurantId} id={this.state.id} style={{ maxWidth: 350, minWidth: 350, marginTop: 50 }}>
              <div className="editImgHolder">
                <CardImg width="100%" src={this.state.image} />
              </div>
              <div className="editInfoHolder">
                <CardBody>
                  <CardTitle style={{ marginBottom: 10 }}><p className="favoritesName">{this.state.name}</p></CardTitle>
                  <CardSubtitle><strong>Yelp rating: </strong>{this.state.yelpRating}</CardSubtitle>

                  <Label for="exampleSelect">My Rating:</Label>
                  <Ratings
                    rating={this.state.rating}
                    widgetRatedColors="goldenrod"
                    changeRating={this.changeRating}
                  >
                    <Ratings.Widget />
                    <Ratings.Widget />
                    <Ratings.Widget />
                    <Ratings.Widget />
                    <Ratings.Widget />
                  </Ratings>
                  <CardText style={{ marginTop: 10 }}><strong>Notes:</strong></CardText>
                  <div className="form-group">
                    <Input defaultValue={this.state.notes} type="textarea" name="text" id="notes" onChange={this.handleFieldChange} />
                  </div>
                  <Button
                    color="primary"
                    type="submit"
                    onClick={this.updateFavorite}
                    className="btn btn-primary"
                  >
                    Submit
            </Button>
                  <Button
                    color="danger"
                    type="submit"
                    style={{ marginLeft: "5px" }}
                    onClick={() => this.props.history.push("/favorites")}
                  >
                    Cancel
            </Button>
                </CardBody>
              </div>
            </Card>
          }
        </CardGroup>
      </React.Fragment>
    );
  }
}