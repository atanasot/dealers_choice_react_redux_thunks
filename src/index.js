import React from "react";
import ReactDom from "react-dom";
import Manufacturers from "./Manufacturers";
import { Provider, connect } from "react-redux"; //makes Redux store available to the rest of app
import store, { loadingThunk } from "./store"; //this is the file where we set up the Redux store
import { fetchAllManufacturers } from "./store";

class _App extends React.Component {
  constructor() {
    super();
    this.state = {}; //this is the store's state // maybe change this???
  }

  async componentDidMount() {
    this.props.load(); //this gets called when app loads, getting manufacturers from props
    this.props.updateLoading();
  }

  render() {
    const { manufacturers, loading } = this.props; //we get state from props because its a connected component
    console.log(this.props);
    //loading = this.props
    if (loading) return <h2>Loading...</h2>;
    return (
      <div>
        <h1>ACME Automobiles For Sale</h1>
        <Manufacturers manufacturers={manufacturers} />
      </div>
    );
  }
}

//in this func we get the state of the store
const mapStateToProps = (state) => state; //we dont call this function. It always gets called with state and should return {}

// Load thunks
const mapDispatchToProps = (dispatch) => {
  return {
    load: () => dispatch(fetchAllManufacturers()),
    updateLoading: () => dispatch(loadingThunk()), //loading
  };
};

const App = connect(mapStateToProps, mapDispatchToProps)(_App);

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
