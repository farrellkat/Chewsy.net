import React, { Component } from "react"
import "bootstrap/dist/css/bootstrap.min.css";
import apiModule from "../modules/apiModule";




export default class SearchForm extends Component {
    userId = sessionStorage.getItem("credentials")

    state = {
        category1: "",
        category2: "",
        category3: "",
        cityInput: "",
        stateInput: "",
        radiiInput: "",
        randomNumber: "",
    }



    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        if (evt.target.value === "Select a Category") stateToChange[evt.target.id] = ""
        this.setState(stateToChange);
    };



    // initialFoodSearch = () => {
    //     this.props.getRandomOffset(
    //         this.state.cityInput,
    //         this.state.stateInput,
    //         this.state.radiiInput,
    //         this.state.category1,
    //         this.state.category2,
    //         this.state.category3).then(randomNumber => {
    //             this.setState({
    //                 randomNumber: randomNumber
    //             })
    //         }).then(()=>
    //             apiModule.getRandomRestaurant(
    //                 this.state.cityInput,
    //                 this.state.stateInput,
    //                 this.state.radiiInput,
    //                 this.state.category1,
    //                 this.state.category2,
    //                 this.state.category3,
    //                 this.state.randomNumber
    //             )).then((res) => console.log(res))
    // }

    // initialSurpriseSearch = () => {
    //     this.props.getAllRandomOffset(
    //         this.state.cityInput,
    //         this.state.stateInput,
    //         this.state.radiiInput).then(randomNumber => {
    //             this.setState({
    //                 randomNumber: randomNumber
    //             })
    //         }).then(()=>
    //             apiModule.getRandomSurpriseRestaurant(
    //                 this.state.cityInput,
    //                 this.state.stateInput,
    //                 this.state.radiiInput,
    //                 this.state.randomNumber
    //             )).then((res) => console.log(res, this.state.randomNumber))
    // }

    render() {
        return (
            <React.Fragment>
                {
                    <form className="container">
                        <p className="text-center">Choose your location:</p>
                        <div className="row justify-content-center">
                            <input
                                id="cityInput"
                                type="text"
                                required
                                className="form-control col-md-2 mr-1"
                                placeholder="City"
                                onChange={this.handleFieldChange}
                            />
                            <select className="custom-select col-md-1 mr-1"
                                defaultValue=""
                                name="stateOption"
                                id="stateInput"
                                onChange={this.handleFieldChange}
                            >
                                <option>State</option>
                                {this.props.states.map(state => (
                                    <option key={state.abbreviation} value={state.abbreviation}>
                                        {state.abbreviation}
                                    </option>
                                ))}
                            </select>
                            <select className="custom-select col-md-1"
                                defaultValue=""
                                name="radiusOption"
                                id="radiiInput"
                                onChange={this.handleFieldChange}
                            >
                                <option>Radius</option>
                                {this.props.radii.map(radii => (
                                    <option key={radii.radius} id={radii.radius} value={radii.value}>
                                        {radii.radius}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <p className="text-center mt-5">Select up to 3 cuisines:</p>
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
                                            <option key={c.alias} id={c.alias} value={`,${c.alias}`}>
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
                                            <option key={c.alias} id={c.alias} value={`,${c.alias}`}>
                                                {c.title}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </label>
                        </section>
                        <section className="px-5 mt-5 d-flex justify-content-center align-items-start">
                            <div className="input-group-append">
                                <button
                                    className="btn btn-info"
                                    onClick={()=>{
                                        this.props.updateUserState(
                                            this.state.category1,
                                            this.state.category2,
                                            this.state.category3,
                                            this.state.cityInput,
                                            this.state.stateInput,
                                            this.state.radiiInput)
                                            this.props.initialFoodSearch()
                                    }}
                                    type="button">
                                    <strong>Let's eat!</strong>
                                </button>
                            </div>
                            <div className="input-group-append ml-1">
                                <button
                                className="btn btn-danger"
                                type="button"
                                onClick={this.initialSurpriseSearch}><i>Surprise me</i></button>
                            </div>
                        </section>
                    </form>
                }
            </React.Fragment>
        );
    }
}