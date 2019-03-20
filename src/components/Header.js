import React, { Component } from "react"

export default class Header extends Component {
    render() {
        return (
            <React.Fragment>
                <header className="text-center mt-5 mb-5" style={{backgroundColor: 'transparent'}}>
                    <h1 style={{fontSize: "120px"}}>Chewsy</h1>
                    <h4>feast with your eyes / go with your gut</h4>
                </header>
            </React.Fragment>
        )
    }
}