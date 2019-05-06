import React, { Component } from "react"
import UserManager from "../../modules/UserManager"
import { Card, CardTitle, CardText, CardImg, CardBody, Button, CardSubtitle, Form, FormGroup, Input, Col, Row } from 'reactstrap';
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
        checked: false,
        search: ""
    }

    handleChange(checked) {
        this.setState({ checked });
    }

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    searchOneUsersFavorites = (user, search) => {
        UserManager.searchUserFavorites(user, search).then((favorites) => {
            this.setState({
                favorites: favorites
            })
        })
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
                        <h1 className="stickyPageHeader">{this.state.friendName}'s Favorites</h1>
                        <div className="searchContainer">
                            <Form className="searchInput">
                                <Col>
                                    <Row style={{ justifyContent: "center" }}>
                                        <FormGroup>
                                            <Input type="text"
                                                name="search"
                                                id="search"
                                                onChange={this.handleFieldChange}
                                                style={{ marginRight: 5 }} />
                                        </FormGroup>
                                        <FormGroup style={{ marginLeft: "5px" }}>
                                            <Button
                                                color="info"
                                                onClick={() => this.searchOneUsersFavorites(this.props.match.params.friendId, this.state.search)}
                                            >Search</Button>
                                            <Button
                                                outline color="warning"
                                                onClick={() => UserManager.getUserFavorites(this.props.match.params.friendId).then((favorites) => {
                                                    this.setState({
                                                        favorites: favorites
                                                    })
                                                })}
                                                style={{ marginLeft: "5px" }}
                                            >Show all</Button>
                                        </FormGroup>
                                    </Row>
                                </Col>
                            </Form>
                        </div>
                        <Form className="infoSwitch">
                            <span style={{ marginRight: "10px" }}>{`${(this.state.checked) ? `Hide details` : `Show details`}`}</span>
                            <Switch
                                onChange={this.handleChange}
                                checked={this.state.checked}
                                onColor="#FF5A5A" />
                        </Form>
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
                                <Card key={favorite.restaurantId} id={favorite.id} style={{ maxWidth: 350, margin: 5, padding: "5px" }}>
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
                                                <CardText><a target="_blank" rel="noopener noreferrer" href={`http://maps.google.com/?q=
                                                ${favorite.location.address1} ${favorite.location.city}, ${favorite.location.state} ${favorite.location.zip_code}`}
                                                >{favorite.location.address1}
                                                    <br />
                                                    {favorite.location.city}, {favorite.location.state} {favorite.location.zip_code}
                                                </a>
                                                </CardText>
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