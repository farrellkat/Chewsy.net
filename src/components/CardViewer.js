import React, { Component } from "react"
import "../App.css"
import takeout from "../img/takeout.png"

export default class CardViewer extends Component {
    componentDidMount() {
        this.props.checkUserId()
    }

    render() {
        return (
            <React.Fragment>
                <div className="cardHolderBg">
            <section className="cardHolder" style={{marginTop:"70px"}}>
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
                <img src={takeout} alt="takeout" style={{width:"200px", filter: "invert(100%)"}} />
            </div>
            </React.Fragment>
        )
    }
}