import React from "react";
import ReactDom from "react-dom";
import axios from "axios";
import Manufacturers from "./Manufacturers";
import { Provider } from "react-redux"; //makes Redux store available to the rest of app
import store from "./store"; //this is the file where we set up the Redux store

class App extends React.Component {
  constructor() {
    super();
    this.state = { ...store.getState() }; //this is the store's state
  }

  async componentDidMount() {
    try {
      const cars = (await axios.get("/api/cars")).data;

      //redux subscribe
      store.subscribe(() => {
        this.setState(store.getState());
      });

      store.dispatch({
        type: "LOAD_CARS",
        cars,
      });

      store.dispatch({
        type: "LOADED",
      });
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const { cars, loading } = this.state;
    //const cars = this.state.cars;
    if (loading) return <h2>Loading...</h2>;
    return (
      <div>
        <h1>ACME Automobiles For Sale</h1>
        <Manufacturers cars={cars} />
      </div>
    );
  }
}

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
