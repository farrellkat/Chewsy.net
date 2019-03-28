import React, { Component } from "react"
import UserManager from "../../modules/UserManager"
import { Card, CardTitle, CardText, CardImg, CardBody, Button } from 'reactstrap';
import Ratings from "react-ratings-declarative"
import Masonry from "react-masonry-component"
import Switch from "react-switch";

const masonryOptions = {
    transitionDuration: '0.8s',
    fitWidth: true,
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
        checked: false
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
        }
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
            <React.Fragment>
                <div className="favBg" style={{ overflowY: "scroll" }}>
                <div className="stickyHeader">
                    <h1 style={{ textAlign: "center", color: "white", marginLeft:"40px" }}>My Favorites</h1>
                    <label style={{ display: "flex", color:"white", alignItems:"center", marginRight:"40px" }}>
                        <span style={{marginRight:"10px"}}>{`${(this.state.checked) ? `Hide details` : `Show details`}`}</span>
                            <Switch onChange={this.handleChange} checked={this.state.checked} />
                    </label>
                        </div>
                    <Masonry
                        className={'my-gallery-class'} // default ''
                        elementType={'ul'} // default 'div'
                        options={masonryOptions} // default {}
                        disableImagesLoaded={false} // default false
                        updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                        imagesLoadedOptions={imagesLoadedOptions} // default {}
                        style={{top:"60px"}}
                    >
                        {
                            this.state.favorites.map(favorite =>
                                <Card key={favorite.restaurantId} id={favorite.id} style={{ maxWidth: 350, minWidth: 350, margin: 5, padding: "5px" }}>
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
                                                <CardText style={{ marginBottom: "0px", textAlign: "center" }}><strong>Yelp rating:</strong></CardText>
                                                <div className="favoritePageRatings">
                                                    {this.yelpCurtain(favorite)} {/* hides the yelp review until user reviews */}
                                                </div>
                                                <CardText style={{ marginBottom: "0px", textAlign: "center" }}><strong>My rating:</strong></CardText>
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
                                                <CardText>{favorite.location.address1}<br />
                                                    {favorite.location.city}, {favorite.location.state} {favorite.location.zip_code}</CardText>
                                                <CardText><strong>Phone: </strong>{favorite.phone}</CardText>
                                                <CardText><strong>Website: </strong><a href={favorite.url} target="_blank" rel="noopener noreferrer">{favorite.name}</a></CardText>
                                                <div className="favNotes">
                                                    <CardText style={{ marginBottom: 0 }}><strong>Notes:</strong></CardText>
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
            </React.Fragment>
        )
    }
}