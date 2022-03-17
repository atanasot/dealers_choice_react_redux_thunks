import React from "react";
import ReactDom from "react-dom";
import Manufacturers from "./Manufacturers";
import { Provider, connect } from "react-redux";
import store, { loadingThunk } from "./store";
import { fetchAllManufacturers } from "./store";

class _App extends React.Component {
  async componentDidMount() {
    this.props.load();
    this.props.updateLoading();
  }

  render() {
    const { manufacturers, loading } = this.props;
    if (loading) return <h2>Loading...</h2>;
    return (
      <div>
        <h1>ACME Automobiles For Sale</h1>
        <Manufacturers manufacturers={manufacturers} />
      </div>
    );
  }
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => {
  return {
    load: () => dispatch(fetchAllManufacturers()),
    updateLoading: () => dispatch(loadingThunk()),
  };
};

const App = connect(mapStateToProps, mapDispatchToProps)(_App);

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
