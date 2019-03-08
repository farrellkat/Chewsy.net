import React, { Component } from "react"
import { Route, Redirect } from "react-router-dom"
import SearchForm from "./searchForm";
import Login from "./authentication/Login"
import apiModule from "../modules/apiModule";
import Registration from "./authentication/Registration";


export default class ApplicationViews extends Component {

    isAuthenticated = () => (sessionStorage.getItem("credentials") !== null || localStorage.getItem("credentials") !== null)

    state = {
        categories: [],
    }

    componentDidMount() {
        const newState = {}

        apiModule.getAllCategories().then(allCategories => {
            this.setState({
                categories: allCategories
            })
        })
            .then(() => this.setState(newState))
    }



    render() {
        return (
            <React.Fragment>
                <Route exact path="/login" render={(props) => {
                    return <Login {...props}/>
                }} />
                <Route exact path="/registration" render={(props) => {
                    return <Registration {...props} />
                }}
                />
                <Route exact path="/search" render={(props) => {
                        if (this.isAuthenticated()) {
                            return <SearchForm categories={this.state.categories}
                            activeUser={this.props.activeUser}/>
                         } else {
                                return <Redirect to="/login" />
                              }
                    }
                } />
            </React.Fragment>
        );
    }
}