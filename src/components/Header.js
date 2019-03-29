import React, { Component } from "react"

export default class Header extends Component {
    render() {
        return (
            <React.Fragment>
                <header className="chewsyHeader">
                    <h1 className="chewsyHeaderTitle">Chewsy</h1>
                    <h4 className="chewsySubtitle">feast with your eyes</h4>
                    <h4 className="chewsySubtitle">go with your gut</h4>
                </header>
            </React.Fragment>
        )
    }
}