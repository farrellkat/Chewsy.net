import React, { Component } from "react"
import { Button, Row, Col, Container, Form, FormGroup, Input } from "reactstrap"
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
        const friendObject = {
            friendId: friendId,
            userId: this.props.activeUser
        }
        UserManager.followFriend(friendObject).then(() =>
            this.componentDidMount())
    }
    unfollowFriend = (id) => {
        UserManager.unfollowFriend(id).then(() =>
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
                    .then((users) => users.filter((user) => user.id !== this.props.activeUser))
                    .then((users) => {
                        const friendIds = (this.state.friends.map((friend) => friend.friendId)) // get array of friend Id's
                        for (let i = 0; i < friendIds.length; i++) { // loop through friend id's
                            users.forEach(user => {  // loop through each user and check against friendId's for a match
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
                .then((users) => users.filter((user) => user.id !== this.props.activeUser))


                .then((users) => {
                    const friendIds = (this.state.friends.map((friend) => friend.friendId))

                    const userIds = users.map(u => u.id)

                    const enemies = userIds.filter(uid => {
                        const foundFriend = friendIds.reduce((c,nId) => {
                            if (nId === uid) {
                                return c += nId
                            }
                            return c
                        }, 0)
                        return foundFriend === 0
                    })

                    console.log(enemies)

                //    console.log(friendIds.map((friendId) => users.filter((user) => friendId !== user.id)))

                //    for (let i=0; i<friendIds.length; i++) {
                //     while (users.indexOf(friendIds[i]) !== -1) {
                //         users.splice(users.indexOf(friendIds[i]), 1);
                //       }
                // }
                // console.log(users)
                }
                )
            )
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
                    <h4 style={{ textAlign: "center", marginBottom: 30 }}>My Friends</h4>
                    {
                        this.state.myFriends.map(user =>
                            <Container style={{ marginBottom: 10 }} className="mainFriendContainer" id={user.id} key={user.id}>
                                <Row className="friendContainer" style={{ marginBottom: 10 }}>
                                    <Col xs="3" className="friendName">{user.firstName} {user.lastName}</Col>
                                    <Col xs="3" className="friendCity">{user.city}, {user.state} </Col>
                                    <Button
                                        color="danger"
                                        className="deleteFriendButton"
                                        onClick={() => this.unfollowFriend(user.id)}>Unfollow</Button>
                                </Row>
                            </Container>
                        )
                    }
                </section>
                <section className="friendListContainer">
                    <h4 style={{ textAlign: "center", marginBottom: 30 }}>New Friends</h4>
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