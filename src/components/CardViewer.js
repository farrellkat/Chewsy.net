import React, { Component } from "react"
import { Button } from "reactstrap"
import "../App.css"
// import takeout from "../img/takeout.png"



export default class CardViewer extends Component {
    yumButton = <Button
        color="info"
        className="yumButton"
        onClick={() =>
            this.props.history.push("/restaurantinfo")}><i class="far fa-laugh-beam smiley"></i>
    </Button>
    render() {
        return (
            <React.Fragment>
                <div className="cardHolderBg">
                    <section className="cardHolder" style={{ marginTop: "70px" }}>
                        <div className="imgContainer">
                            <img src={this.props.businessImage}
                                className="cardImage"
                                alt="foodImage"
                            // height="400"
                            // width="400"
                            >
                            </img>
                            <div className="cardButtonContainer">
                                <Button
                                    color="danger"
                                    className="passButton"
                                    onClick={this.props.FoodSearch}><i class="far fa-meh smiley"></i></Button>
                                {
                                    (this.props.businessImage !== "/static/media/errorPicture.3298e1b0.png")
                                    ? this.yumButton
                                    : ""
                                }
                            </div>
                        </div>
                    </section>
                    {/* <img src={takeout} className="takeoutImg" alt="takeout" /> */}
                </div>
            </React.Fragment>
        )
    }
}