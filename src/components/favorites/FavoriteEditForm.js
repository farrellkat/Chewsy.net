import React, { Component } from "react"
import UserManager from "../../modules/UserManager"
import { Card, CardTitle, CardText, CardImg, CardGroup, CardBody, CardSubtitle, Button, Input } from 'reactstrap';
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
          rating: restaurant.rating,
          url: restaurant.url
        })
      })
  }


  render() {
    return (
      <React.Fragment>
        <CardGroup className="favorites" style={{ margin: 20, justifyContent: "center" }}>
          {
            <Card key={this.state.restaurantId} id={this.state.id} style={{ marginTop: 50 }}>
              <div className="editImgHolder">
                <CardImg width="100%" src={this.state.image} />
              </div>
              <div className="editInfoHolder">
                <CardBody>
                  <CardTitle style={{ marginBottom: 10 }}><p className="favoritesName">{this.state.name}</p></CardTitle>
                  <div className="yelpRatingsContainer">
                    <CardSubtitle><strong>Yelp rating: </strong></CardSubtitle>
                    <Ratings
                      rating={this.state.yelpRating}
                      widgetDimensions="30px"
                      widgetRatedColors="darkred"
                      widgetSpacings="5px"
                    >
                      <Ratings.Widget />
                      <Ratings.Widget />
                      <Ratings.Widget />
                      <Ratings.Widget />
                      <Ratings.Widget />
                    </Ratings>
                  </div>
                  <div className="userRatingsContainer">
                    <CardSubtitle><strong>My Rating: </strong></CardSubtitle>
                    <Ratings
                      rating={this.state.rating}
                      widgetRatedColors="goldenrod"
                      changeRating={this.changeRating}
                      widgetDimensions="30px"
                      widgetSpacings="5px"
                    >
                      <Ratings.Widget />
                      <Ratings.Widget />
                      <Ratings.Widget />
                      <Ratings.Widget />
                      <Ratings.Widget />
                    </Ratings>
                  </div>
                  <CardText style={{ marginTop: "10px", marginBottom: 0 }}><strong>Address:</strong></CardText>
                  <CardText><a target="_blank" rel="noopener noreferrer" href={`http://maps.google.com/?q=
                  ${this.state.Address1} ${this.state.city}, ${this.state.state} ${this.state.zip_code}`}
                  >{this.state.Address1}
                    <br />
                    {this.state.city}, {this.state.state} {this.state.zip_code}
                  </a>
                  </CardText>
                  <CardText style={{ marginBottom: "0px" }}><strong>Phone: </strong></CardText>
                  <CardText>{this.state.phone}</CardText>
                  <CardText style={{ marginBottom: "0px" }}><strong>Website: </strong></CardText>
                  <CardText><a href={this.state.url} target="_blank" rel="noopener noreferrer">{this.state.name}</a></CardText>


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