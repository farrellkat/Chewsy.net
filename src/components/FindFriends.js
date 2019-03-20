import React, { Component } from "react"
import { Button, Row, Col, Container, Form, FormGroup, Input } from "reactstrap"
import UserManager from "../modules/UserManager";
import "../App.css"
import Header from "../components/Header"
export default class FindFriends extends Component {

    state = {
        myFriends: [],
        friends: [],
        notMyFriends: [],
        users: []
    }

    userFriends = []
    userArray = []
    userFriendArray = []
    notFriendsArray = []

    followFriend = (friendId) => {
        const friendObject = {
            fId: friendId,
            userId: this.props.activeUser
        }
        UserManager.followFriend(friendObject).then(() =>
            this.componentDidMount())
    }

    unfollowFriend = (userId, friendId) => {
        UserManager.unfollowFriend(userId, friendId)
        // .then((user) => UserManager.deleteFriend(user[0].id))
        .then(() =>
            this.componentDidMount())
    }

    componentDidMount() {
        this.userFriendArray = []
        this.notFriendsArray = []
        UserManager.getAllFriends(this.props.activeUser).then((friends) =>
            this.setState({
                friends: friends
            })
        )
            .then(() =>
                UserManager.getAllUsers()
                    .then((users) => {
                        const allUsers = users.filter((user) => user.id !== this.props.activeUser)
                        const friendIds = (this.state.friends.map((friend) => friend.fId)) // get array of friend Id's
                        for (let i = 0; i < friendIds.length; i++) { // loop through friend id's
                            allUsers.forEach(user => {  // loop through each user and check against friendId's for a match
                                if (user.id === friendIds[i]) {
                                    this.userFriendArray.push(user)  //push matches to userFriendArray
                                }
                            })
                        }
                        this.setState({
                            myFriends: this.userFriendArray
                        })
                    })
            )
            .then(() => UserManager.getAllUsers()
                .then((users) => {
                    const allUsers = users.filter((user) => user.id !== this.props.activeUser)
                    const friendIds = (this.state.friends.map((friend) => friend.fId))

                    // const userIds = allUsers.map(u => u.id)

                    const notMyFriends = allUsers.filter(user => {
                        const foundFriend = friendIds.reduce((c, nId) => {
                            if (nId === user.id) {
                                return c += nId
                            }
                            return c
                        }, 0)
                        return foundFriend === 0
                    })
                    this.setState({
                        notMyFriends: notMyFriends
                    })
                }
                )
            )
    }


    render() {
        return (
            <React.Fragment>
                <div className="findBg" style={{overflowY: "scroll"}}>
            {/* <Header/> */}
                <div style={{ marginBottom: 50  }} className="searchContainer">
                    <Form inline>
                        <FormGroup>
                            <Input type="text" name="searchForm" id="searchForm" style={{ marginRight: 5 }} />
                        </FormGroup>
                        <Button color="info">Search</Button>
                    </Form>
                </div>

                <section className="friendListContainer" >
                    <h4 style={{ textAlign: "center", marginBottom: 30, color: "rgb(245, 138, 88)"}}>My Friends</h4>
                    {
                        this.state.myFriends.map(user =>
                            <Container style={{ marginBottom: 10 }} className="mainFriendContainer" id={user.id} key={user.id}>
                                <Row className="friendContainer" style={{ marginBottom: 10, backgroundColor: "white" }}>
                                    <Col xs="3" className="friendName">{user.firstName} {user.lastName}</Col>
                                    <Col xs="3" className="friendCity">{user.city}, {user.state} </Col>
                                    <Button
                                        color="danger"
                                        className="deleteFriendButton"
                                        onClick={() => this.unfollowFriend(this.props.activeUser, user.id)}><i class="fas fa-user-minus"></i></Button>
                                </Row>
                            </Container>
                        )
                    }
                </section>
                <section className="friendListContainer">
                    <h4 style={{ textAlign: "center", marginBottom: 30, color: "rgb(245, 138, 88)" }}>New Friends</h4>
                    {
                        this.state.notMyFriends.map(user =>
                            <Container style={{ marginBottom: 10 }} className="mainFriendContainer" id={user.id} key={user.id}>
                                <Row className="friendContainer" style={{ marginBottom: 10, backgroundColor: "white" }}>
                                    <Col xs="3" className="friendName">{user.firstName} {user.lastName}</Col>
                                    <Col xs="3" className="friendCity">{user.city}, {user.state} </Col>
                                    <Button
                                        color="primary"
                                        className="addFriendButton"
                                        onClick={() => this.followFriend(user.id)}><i class="fas fa-user-plus"></i></Button>
                                </Row>
                            </Container>
                        )
                    }
                </section>
                </div>
            </React.Fragment>
        )
    }
}