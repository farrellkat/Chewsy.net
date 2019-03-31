import React, { Component } from "react"
import { Button } from "reactstrap"
import "../App.css"
import takeout from "../img/takeout.png"

export default class CardViewer extends Component {
    // componentDidMount() {
    // }

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
                                    onClick={this.props.FoodSearch}><i class="far fa-meh"></i></Button>
                                <Button
                                    color="info"
                                    className="yumButton"
                                    onClick={() => this.props.history.push("/restaurantinfo")}><i class="far fa-laugh-beam"></i></Button>
                            </div>
                        </div>
                    </section>
                    {/* <img src={takeout} className="takeoutImg" alt="takeout" /> */}
                </div>
            </React.Fragment>
        )
    }
}