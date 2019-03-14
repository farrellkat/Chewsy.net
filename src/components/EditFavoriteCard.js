import React, { Component } from "react"

export default class EmployeeDetail extends Component {
    render() {
        /*
            Using the route parameter, find the animal that the
            user clicked on by looking at the `this.props.animals`
            collection that was passed down from ApplicationViews
        */
        const favorite = this.props.favorites.find(a =>
            a.id === parseInt(this.props.match.params.userId))
             || {id:404, name:"404", breed: "Favorite not found"}

        return (
            <section className="animal">
                <div key={employee.id} className="card">
                    <div className="card-body">
                        <h4 className="card-title">
                            {employee.name}
                        </h4>
                        <button
                            onClick={() =>
                                this.props.fireEmployee(employee.id)
                                    .then(() => this.props.history.push("/employees"))
                            }
                            className="card-link">Terminate Employment</button>
                    </div>
                </div>
            </section>
        )
    }
}