import React, { Component } from "react"

export default class FavoritesCard extends Component {
    render() {
        return(
           <React.Fragment>
               <div key={this.props.favorite.id}>
                    <h4>{this.props.favorite[0].name}</h4>
                    <p>{this.props.favorite.location.display_address}</p>
                    <p>{this.props.favorite.phone}</p>
                    <img src={this.props.favorite.image} alt="food"></img>
               </div>
           </React.Fragment>
        )
    }
}