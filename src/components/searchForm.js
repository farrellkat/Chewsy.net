import React, { Component } from "react"
import "bootstrap/dist/css/bootstrap.min.css";
// import apiModule from "../modules/apiModule";
import { Input, FormGroup, Form, Button, Row, Col } from "reactstrap"
import staticAppData from "../staticAppData"

export default class SearchForm extends Component {
    // userId = sessionStorage.getItem("credentials")

    state = {
        activeUser: "",
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
        const activeUser = localStorage.getItem("userId")
        this.setState({ activeUser: activeUser })
    }

    handleFieldChange = evt => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        if (evt.target.value === "Select a Category") stateToChange[evt.target.id] = ""
        this.setState(stateToChange);
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault()
            window.alert("Please fill out all forms and click 'Let's Go' or 'Surprise Me!'")
        }
      }

    render() {
        const categories = staticAppData.categories.filter(data => data.parents[0] === "restaurants")
        return (
            <React.Fragment>
                <div className="searchBg">
                    <Form className="container" style={{ backgroundColor: "rgb(245, 138, 88, 0.3)", borderRadius: "5px", width: "80%" }}>
                        <h1 className="chewsySearchHeaderTitle">Let's eat!</h1>
                        <p className="searchFormLabel">Choose your location:</p>
                        <Row form style={{justifyContent:"center"}}>
                            <Col md={4}>
                                <FormGroup>
                                    <Input
                                        id="cityInput"
                                        type="text"
                                        // defaultValue={this.props.userCity}
                                        required
                                        // className="col-md-2"
                                        placeholder="City or Zip Code"
                                        onKeyPress={(e) => this.handleKeyPress(e)}
                                        onChange={this.handleFieldChange}
                                    />
                                </FormGroup>
                                </Col>
                                <Col md={1}>
                                <FormGroup>
                                    <Input className="custom-select"
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
                                </FormGroup>
                            </Col>
                            <Col md={1}>
                                <FormGroup>
                                    <Input className="custom-select"
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
                            </Col>
                        </Row>
                        <p className="searchFormLabel">And up to 3 cuisines:</p>
                        <Row form style={{justifyContent:"center"}}>
                            <Col md={3}>
                                <FormGroup>
                                    <Input className="custom-select"
                                        type="select"
                                        defaultValue=""
                                        name="categoryContainer"
                                        id="category1"
                                        onChange={this.handleFieldChange}
                                    >
                                        <option>Category 1</option>
                                        {categories.map(c => (
                                            <option key={c.alias} id={c.alias} value={c.alias}>
                                                {c.title}
                                            </option>
                                        ))}
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                    <Input
                                        className="custom-select"
                                        type="select"
                                        defaultValue=""
                                        name="categoryContainer"
                                        id="category2"
                                        onChange={this.handleFieldChange}
                                    >
                                        <option>Category 2</option>
                                        {categories.map(c => (
                                            <option key={c.alias} id={c.alias} value={`,${c.alias}`}>
                                                {c.title}
                                            </option>
                                        ))}
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                    <Input
                                        className="custom-select"
                                        type="select"
                                        defaultValue=""
                                        name="categoryContainer"
                                        id="category3"
                                        onChange={this.handleFieldChange}
                                    >
                                        <option>Category 3</option>
                                        {categories.map(c => (
                                            <option key={c.alias} id={c.alias} value={`,${c.alias}`}>
                                                {c.title}
                                            </option>
                                        ))}
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Col>
                            <Row style={{justifyContent:"center"}}>

                                <FormGroup>
                                    <Button
                                        color="info"
                                        style={{marginRight:"5px"}}
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
                                <FormGroup>
                                    <Button
                                        color="danger"
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
                            </Row>
                        </Col>
                    </Form>
                </div>
            </React.Fragment>
        );
    }
}