import React, { Component } from "react"

export default class ErrorBoundary extends Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }

    componentDidCatch() {
      // Display fallback UI
      this.setState({ hasError: true });
    }

    render() {
      if (this.state.hasError) {
        // You can render any custom fallback UI
        return alert("Whoops! Press pass to move on")
      }
      return this.props.children;
    }
  }