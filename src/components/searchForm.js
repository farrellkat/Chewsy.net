import React, { Component } from "react"
import "bootstrap/dist/css/bootstrap.min.css";
// import apiModule from "../modules/apiModule";
import Header from "../components/Header"
import { Input, FormGroup, Form, Label, Button } from "reactstrap"

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

    // getDefaultStateValue = () => {return this.props.states.find(state => state.abbreviation === this.props.userState)}

    // console.log(getDefaultStateValue)

    componentDidMount() {
        this.props.checkUserId()
        this.setState({
            cityInput: this.props.userCity,
            stateInput: this.props.userState
        })
    }

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        if (evt.target.value === "Select a Category") stateToChange[evt.target.id] = ""
        this.setState(stateToChange);
    };

    render() {
        return (
            <React.Fragment>
                <div className="searchBg">
                    {/* <Header /> */}
                    {
                        <Form className="container" style={{backgroundColor: "rgb(245, 138, 88, 0.3)", borderRadius: "5px", width:"80%"}}>
                        <h1 style={{textAlign:"center", fontSize: "5em"}}>Let's eat!</h1>
                            <p className="text-center" style={{color: "white", fontWeight: "bold", fontSize:"25px"}}>Choose your location:</p>
                            <FormGroup className="row justify-content-center">
                                <Input
                                    id="cityInput"
                                    type="text"
                                    // defaultValue={this.props.userCity}
                                    required
                                    className="form-control col-md-2 mr-1"
                                    placeholder="City"
                                    onChange={this.handleFieldChange}
                                />
                                <Input className="custom-select col-md-1 mr-1"
                                    type="select"
                                    name="stateOption"
                                    id="stateInput"
                                    // defaultValue={this.state.stateInput}
                                    onChange={this.handleFieldChange}>

                                    <option>State</option>
                                    {this.props.states.map(state => (
                                        <option key={state.abbreviation} value={state.abbreviation}>
                                            {state.abbreviation}
                                        </option>
                                    ))}
                                </Input>
                                <Input className="custom-select col-md-1"
                                    type="select"
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
                                </Input>
                            </FormGroup>
                            <p className="text-center mt-5" style={{color: "white", fontWeight: "bold", fontSize:"25px"}}>Select up to 3 cuisines:</p>
                            <section className="px-5 mt-1 d-flex justify-content-center align-items-start">
                                <Label className="mr-1">
                                    <FormGroup className="input-group">
                                        <Input className="custom-select"
                                            type="select"
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
                                        </Input>
                                    </FormGroup>
                                </Label>
                                <Label className="mr-1">
                                    <FormGroup>
                                        <Input
                                            type="select"
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
                                        </Input>
                                    </FormGroup>
                                </Label>
                                <Label>
                                    <FormGroup>
                                        <Input
                                            type="select"
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
                                        </Input>
                                    </FormGroup>
                                </Label>
                            </section>
                            <section className="px-5 mt-5 d-flex justify-content-center align-items-start">
                                <FormGroup className="input-group-append">
                                    <Button
                                        className="btn btn-info"
                                        onClick={() => {
                                            this.props.updateUserState(
                                                this.state.category1,
                                                this.state.category2,
                                                this.state.category3,
                                                this.state.cityInput,
                                                this.state.stateInput,
                                                this.state.radiiInput)
                                            this.props.history.push("/cardviewer")
                                        }}
                                        type="button">
                                        <strong>Let's eat!</strong>
                                    </Button>
                                </FormGroup>
                                <FormGroup className="input-group-append ml-1">
                                    <Button
                                        className="btn btn-danger"
                                        type="button"
                                        onClick={() => {
                                            this.setState({ category1: "", category2: "", category3: "" })
                                            this.props.updateSurpriseUserState(
                                                this.state.category1,
                                                this.state.category2,
                                                this.state.category3,
                                                this.state.cityInput,
                                                this.state.stateInput,
                                                this.state.radiiInput)
                                            this.props.history.push("/cardviewer")
                                        }}><i>Surprise me</i></Button>
                                </FormGroup>
                            </section>
                        </Form>
                    }
                </div>
            </React.Fragment>
        );
    }
}