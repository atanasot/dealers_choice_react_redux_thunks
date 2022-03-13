import React, { Component } from "react";
import store from "./store";

class Models extends Component {
  constructor() {
    super();
    this.state = {
      cars: store.getState().cars,
    };
  }
  componentWillUnmount() {
    this.unsubscribe();
  }
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        cars: store.getState().cars,
      });
    });
  }
  render() {
    const car = this.props.car;
    return (
      <ul>
        {car.models.map((model) => (
          <li key={model.id}>{model.name}</li>
        ))}
      </ul>
    );
  }
}

export default Models;
