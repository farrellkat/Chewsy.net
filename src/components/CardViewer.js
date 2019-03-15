import React, { Component } from "react"
import "../App.css"



export default class CardViewer extends Component {

    render() {
        return (
            <section className="cardHolder">
                <div className="imgContainer">
                        <button
                            className="btn btn-danger passButton"
                            onClick={this.props.FoodSearch}>Pass</button>
                    <img src={this.props.businessImage}
                    className="cardImage"
                    alt="foodImage"
                    height="400"
                    width="400"></img>
                        <button
                        className="btn btn-info yumButton"
                        onClick={()=> this.props.history.push("/restaurantinfo")}>Yum!</button>
                </div>
            </section>
        )
    }
}