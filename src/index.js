import React from "react";
import ReactDom from "react-dom";
import axios from "axios";
import Models from './Models'
import Manufacturers from "./Manufacturers";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cars: [],
      loading: true,
    };
  }

  async componentDidMount() {
    try {
      const axiosCars = (await axios.get("/api/cars")).data;
      this.setState({
        cars: axiosCars,
        loading: false,
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const cars = this.state.cars;
    if (this.state.loading) return <h2>Loading</h2>;
    return (
      <div>
        <h1>ACME Automobiles For Sale</h1>
        <Manufacturers cars={cars} />
      </div>
    );
  }
}

ReactDom.render(<App />, document.querySelector("#root"));
