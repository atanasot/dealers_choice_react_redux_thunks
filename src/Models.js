import React, { Component } from "react";
import store, { deleteModel } from "./store";
import { connect } from "react-redux";

const Models = ({ manufacturer, deleteCar }) => {
  return (
    <ul className="liCars">
      {manufacturer.models.map((model) => (
        <li onClick={() => deleteCar(model.id)} key={model.id}>
          <a href="">{model.name}</a>
        </li>
      ))}
    </ul>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteCar: (modelId) => dispatch(deleteModel(modelId)),
  };
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, mapDispatchToProps)(Models);
