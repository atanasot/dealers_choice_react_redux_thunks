import React, { Component } from "react";
import Models from "./Models";
import store from "./store";

class Manufacturers extends Component {
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
    const { cars } = this.state;
    return (
      <ul>
        {cars.map((car) => (
          <li key={car.id}>
            {car.name}
            <Models car={car} />
          </li>
        ))}
      </ul>
    );
  }
}

export default Manufacturers;
