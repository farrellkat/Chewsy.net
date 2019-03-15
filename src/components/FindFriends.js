import React, { Component } from "react"
import { Button, Row, Col, Container, Form, FormGroup, Input } from "reactstrap"
import UserManager from "../modules/UserManager";
import "../App.css"

export default class FindFriends extends Component {

    state = {
        users: [],
        friends: []
    }

    userArray = []

    followFriend = (friendId) => {
        const friendObject = {
            friendId: friendId,
            userId: this.props.activeUser
        }
        UserManager.addNewFriend(friendObject)
    }

    componentDidMount() {
        UserManager.getAllUsers()
            .then((users) => users.filter((user) => user.id !== this.props.activeUser))
            .then((users) => this.setState({
                users: users
            }))
            .then(() =>
                UserManager.getAllFriends(this.props.activeUser).then((friends) =>
                    this.setState({
                        friends: friends
                    })))
    }

    render() {
        return (
            <React.Fragment>
                <div style={{ marginBottom: 50 }} className="searchContainer">
                    <Form inline>
                        <FormGroup>
                            <Input type="text" name="searchForm" id="searchForm" style={{ marginRight: 5 }} />
                        </FormGroup>
                        <Button color="info">Search</Button>
                    </Form>
                </div>

                <section className="friendListContainer">
                    {
                        this.state.users.map(user =>
                            <Container style={{ marginBottom: 10 }} className="mainFriendContainer" id={user.id} key={user.id}>
                                <Row className="friendContainer" style={{ marginBottom: 10 }}>
                                    <Col xs="3" className="friendName">{user.firstName} {user.lastName}</Col>
                                    <Col xs="3" className="friendCity">{user.city}, {user.state} </Col>
                                    <Button
                                        color="primary"
                                        className="addFriendButton"
                                        onClick={() => this.followFriend(user.id)}>Follow</Button>
                                </Row>
                            </Container>
                        )
                    }
                </section>
            </React.Fragment>
        )
    }
}