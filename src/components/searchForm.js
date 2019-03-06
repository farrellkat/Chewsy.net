import React, { Component } from "react"
import "bootstrap/dist/css/bootstrap.min.css";

export default class SearchForm extends Component {

    render() {
        return (
            <React.Fragment>
                    {
                        <form className="px-5 mt-5">
                            <label>
                                <select className="custom-select"
                                    defaultValue=""
                                    name="categoryContainer"
                                    id="categoryContainer"
                                >
                                    <option>Select a Category</option>
                                    {this.props.categories.map(c => (
                                        <option key={c.alias} id={c.alias} value={c.alias}>
                                            {c.title}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <button className="btn btn-info">Submit</button>
                        </form>
                    }
            </React.Fragment>
        );
    }
}