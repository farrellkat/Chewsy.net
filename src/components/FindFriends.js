import React, { Component } from "react"
import { Button, Row, Col, Container, Form, FormGroup } from "reactstrap"
import UserManager from "../modules/UserManager";
import "../App.css"
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
        if (this.props.activeUser) {
            const friendObject = {
                fId: friendId,
                userId: this.props.activeUser
            }
            UserManager.followFriend(friendObject).then(() =>
                this.componentDidMount())
        }
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
                <div className="findBg" style={{ overflowY: "scroll" }}>
                    <section className="friendListContainer" >
                    <h4 style={{ textAlign: "center", marginBottom: 30, marginTop: "30px", color: "rgb(245, 138, 88)" }}>My Friends</h4>
                    {
                        this.state.myFriends.map(user =>
                            <Form style={{ marginBottom: 10 }} id={user.id} key={user.id}>
                                <Row style={{ justifyContent: "center" }}>
                                        <Col md={3} className="friendName findFriendTable">{user.firstName} {user.lastName}</Col>
                                        <Col md={3} className="friendCity findFriendTable">{user.city}, {user.state} </Col>
                                        <Button
                                            color="danger"
                                            className="deleteFriendButton friendButton"
                                            onClick={() => this.unfollowFriend(this.props.activeUser, user.id)}><i class="fas fa-user-minus"></i></Button>
                                </Row>
                            </Form>
                        )
                    }
                    </section>
                    <section className="friendListContainer">
                        <h4 style={{ textAlign: "center", marginBottom: 30, color: "rgb(245, 138, 88)" }}>New Friends</h4>
                        {
                            this.state.notMyFriends.map(user =>
                                <Form style={{ marginBottom: 10 }} id={user.id} key={user.id}>
                                    <Row style={{ justifyContent: "center" }}>
                                        <Button
                                            color="primary"
                                            className="addFriendButton friendButton"
                                            onClick={() => this.followFriend(user.id)}><i className="fas fa-user-plus"></i></Button>
                                        <Col md={3} className="notFriendName findFriendTable">{user.firstName} {user.lastName}</Col>
                                        <Col md={3} className="notFriendCity findFriendTable">{user.city}, {user.state} </Col>
                                    </Row>
                                </Form>
                            )
                        }
                    </section>
                </div>
            </React.Fragment>
        )
    }
}