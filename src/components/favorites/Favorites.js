import React, { Component } from "react"
import UserManager from "../../modules/UserManager"
import { Card, CardTitle, CardText, CardImg, CardBody, Button, Form, FormGroup, Input, Col, Row } from 'reactstrap';
import Ratings from "react-ratings-declarative"
import Masonry from "react-masonry-component"
import Switch from "react-switch";

const masonryOptions = {
    transitionDuration: '0.8s',
    initLayout: true,
    fitWidth: true,
    imagesLoaded: true,
    columnWidth: '.grid-sizer',
    itemSelector: '.grid-item',
    horizontalOrder: true,
    percentPosition: true,
    gutter: 0,
    containerStyle: null
};



const imagesLoadedOptions = { background: '.my-bg-image-el' }
export default class Favorites extends Component {

    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(checked) {
        this.setState({ checked });
    }

    state = {
        favorites: [],
        checked: false,
        search: ""
    }

    editSaveButton = (favorite) => { return (favorite.notes === "") ? "New Note" : "Edit Note" }

    deleteFavorite = (id) => {
        UserManager.deleteFavorite(id)
            .then(() => UserManager.getUserFavorites(this.props.activeUser)
                .then((favorites) => {
                    this.setState({
                        favorites: favorites
                    })
                }))
    }

    yelpCurtain = (favorite) => {
        if (favorite.rating === undefined) {
            return "Rate to unlock"
        } else {
            return <Ratings
                rating={favorite.yelpRating}
                widgetDimensions="15px"
                widgetSpacings="5px"
                widgetRatedColors="darkred"
            >
                <Ratings.Widget />
                <Ratings.Widget />
                <Ratings.Widget />
                <Ratings.Widget />
                <Ratings.Widget />
            </Ratings>
        }
    }

    componentDidMount() {
        UserManager.getUserFavorites(this.props.activeUser).then((favorites) => {
            this.setState({
                favorites: favorites
            })
        })
    }

    searchUsersFavorites = (user, search) => {
        UserManager.searchUserFavorites(user, search).then((favorites) => {
            this.setState({
                favorites: favorites
            })
        })
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault()
            this.searchUsersFavorites(this.props.activeUser, this.state.search)
        }
      }

    handleFieldChange = evt => {
            const stateToChange = {};
            stateToChange[evt.target.id] = evt.target.value;
            this.setState(stateToChange);
    };

    render() {
        return (
            <React.Fragment>
                <div className="favBg" style={{ overflowY: "scroll" }}>
                    <div className="stickyHeader">
                        <h1 className="stickyPageHeader">My Favorites</h1>
                        <div className="searchContainer">
                            <Form className="searchInput">
                                <Col>
                                    <Row style={{ justifyContent: "center" }}>
                                        <FormGroup>
                                            <Input type="text"
                                                name="search"
                                                id="search"
                                                onChange={this.handleFieldChange}
                                                onKeyPress={(e) => this.handleKeyPress(e)}
                                                style={{ marginRight: 5 }} />
                                        </FormGroup>
                                        <FormGroup style={{ marginLeft: "5px" }}>
                                            <Button
                                                color="info"
                                                onClick={() => this.searchUsersFavorites(this.props.activeUser, this.state.search)}
                                            >Search</Button>
                                            <Button
                                                outline color="warning"
                                                onClick={() => UserManager.getUserFavorites(this.props.activeUser).then((favorites) => {
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
                    <Masonry
                        className={'myGalleryClass'} // default ''
                        elementType={'div'} // default 'div'
                        options={masonryOptions} // default {}
                        disableImagesLoaded={false} // default false
                        updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                        imagesLoadedOptions={imagesLoadedOptions} // default {}
                        style={{ top: "60px" }}
                    >
                        {
                            this.state.favorites.map(favorite =>
                                <Card key={favorite.restaurantId} id={favorite.id}
                                // style={{ maxWidth: 350, minWidth: 350, margin: 5, padding: "5px" }}
                                >
                                    <CardImg
                                        width="100%"
                                        src={favorite.image}
                                        onClick={() => this.props.history.push(`/favorites/${favorite.id}/edit`)}
                                    />
                                    <div>
                                        {this.state.checked &&
                                            <CardBody>
                                                <CardTitle style={{ marginBottom: "0px" }}><p className="favoritesName">{favorite.name}</p></CardTitle>
                                                <CardText style={{ textAlign: "center", marginBottom: "0px" }}>
                                                    {favorite.category.map(category =>
                                                        <small className="text-muted" style={{ textAlign: "center", marginBottom: "0px" }}><i>{category.title}&nbsp;</i></small>
                                                    )}
                                                </CardText>
                                                <CardText className="text-muted" style={{ textAlign: "center", marginBottom: "0px" }}>{favorite.price}</CardText>
                                                <CardText style={{ marginBottom: "0px", textAlign: "center" }}><strong>Yelp rating:</strong></CardText>
                                                <div className="favoritePageRatings">
                                                    {this.yelpCurtain(favorite)} {/* hides the yelp review until user reviews */}
                                                </div>
                                                <CardText style={{ marginBottom: "0px", textAlign: "center" }}><strong>My rating:</strong></CardText>
                                                <div className="favoritePageRatings">
                                                    <Ratings
                                                        rating={favorite.rating}
                                                        widgetDimensions="15px"
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
                                                <CardText style={{ marginTop: "10px", marginBottom: 0 }}><strong>Address:</strong></CardText>
                                                <CardText><a target="_blank" rel="noopener noreferrer" href={`http://maps.google.com/?q=
                                                ${favorite.location.address1} ${favorite.location.city}, ${favorite.location.state} ${favorite.location.zip_code}`}
                                                >{favorite.location.address1}
                                                    <br />
                                                    {favorite.location.city}, {favorite.location.state} {favorite.location.zip_code}
                                                </a>
                                                </CardText>
                                                <CardText style={{ marginBottom:"0px" }}><strong>Phone: </strong></CardText>
                                                <CardText>{favorite.phone}</CardText>
                                                <CardText style={{ marginBottom:"0px" }}><strong>Website: </strong></CardText>
                                                <CardText><a href={favorite.url} target="_blank" rel="noopener noreferrer">{favorite.name}</a></CardText>
                                                <div className="favNotes">
                                                    <CardText><strong>Notes:</strong></CardText>
                                                    <CardText>{favorite.notes}</CardText>
                                                </div>
                                                <div className="favButtonContainer">
                                                    <Button
                                                        color="primary"
                                                        style={{ marginRight: 10 }}
                                                        onClick={() => this.props.history.push(`/favorites/${favorite.id}/edit`)}
                                                    ><i class="far fa-edit"></i></Button>
                                                    <Button color="danger" onClick={() => this.deleteFavorite(favorite.id)}><i class="far fa-trash-alt"></i></Button>
                                                </div>
                                            </CardBody>
                                        }
                                    </div>
                                </Card>
                            )
                        }
                    </Masonry>
                </div>
            </React.Fragment >
        )
    }
}