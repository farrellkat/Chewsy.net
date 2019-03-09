import React, { Component } from "react"
import "bootstrap/dist/css/bootstrap.min.css";
import apiModule from "../modules/apiModule";

export default class SearchForm extends Component {

    submitRestaurantQuery = () => {
        apiModule.getRestaurants()
    }

    state = {
        category1: "",
        category2: "",
        category3: ""
    }

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
      };

    render() {
        console.log(sessionStorage.getItem("credentials"))
        return (
            <React.Fragment>
                    {
                        <form className="container">
                        <p className="text-center">Select up to 3 cuisines:</p>
                            <section className="px-5 mt-1 d-flex justify-content-center align-items-start">
                            <label className="mr-1">
                            <div className="input-group">
                                <select className="custom-select"
                                    defaultValue=""
                                    name="categoryContainer"
                                    id="category1"
                                    onChange={this.handleFieldChange}
                                >
                                    <option>Select a Category</option>
                                    {this.props.categories.map(c => (
                                        <option key={c.alias} id={c.alias} value={c.alias}>
                                            {c.title}
                                        </option>
                                    ))}
                                </select>
                                </div>
                            </label>
                            <label className="mr-1">
                            <div className="input-group">
                                <select className="custom-select"
                                    defaultValue=""
                                    name="categoryContainer"
                                    id="category2"
                                    onChange={this.handleFieldChange}
                                >
                                    <option>Select a Category</option>
                                    {this.props.categories.map(c => (
                                        <option key={c.alias} id={c.alias} value={c.alias}>
                                            {c.title}
                                        </option>
                                    ))}
                                </select>
                                </div>
                            </label>
                            <label>
                            <div className="input-group">
                                <select className="custom-select"
                                    defaultValue=""
                                    name="categoryContainer"
                                    id="category3"
                                    onChange={this.handleFieldChange}
                                >
                                    <option>Select a Category</option>
                                    {this.props.categories.map(c => (
                                        <option key={c.alias} id={c.alias} value={c.alias}>
                                            {c.title}
                                        </option>
                                    ))}
                                </select>
                                </div>
                            </label>
                            </section>
                            <section className="px-5 mt-5 d-flex justify-content-center align-items-start">
                            <div className="input-group-append">
                            <button className="btn btn-info" type="button"><strong>Let's eat!</strong></button>
                            </div>
                            <div className="input-group-append ml-1">
                            <button className="btn btn-danger" type="button"><i>Surprise me</i></button>
                            </div>
                            </section>
                        </form>
                    }
            </React.Fragment>
        );
    }
}