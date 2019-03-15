import React, { Component } from "react"
import { Button, Row, Col, Container, Form, FormGroup, Label, Input } from "reactstrap"
import UserManager from "../modules/UserManager";
import "../App.css"

export default class Friends extends Component {

    state = {
        users: []
    }

    componentDidMount() {
        UserManager.getAllUsers().then((users) =>
            users.map(user =>
                this.setState({
                    users: users
                })
            )
        )
    }

    render() {
        return (
            <React.Fragment>
                <div style={{marginBottom: 50}} className="searchContainer">
            <Form inline>
            <FormGroup>
              <Input type="text" name="searchForm" id="searchForm" style={{marginRight:5}}/>
            </FormGroup>
              <Button color="info">Search</Button>
            </Form>
            </div>

            <section className="friendListContainer">
                {
                    this.state.users.map(user =>
                        <Container style={{ marginBottom: 10}} className="mainFriendContainer">
                            <Row className="friendContainer" style={{ marginBottom: 10 }}>
                                <Col xs="3" className="friendName">{user.firstName} {user.lastName}</Col>
                                <Col xs="3" className="friendCity">{user.city}, {user.state} </Col>
                                <Button color="primary" className="addFriendButton">Add Friend</Button>
                            </Row>
                        </Container>
                    )
                }
            </section>
            </React.Fragment>
        )
    }
}