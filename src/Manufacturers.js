import React from "react";
import Models from "./Models";
import store, { createRandomCar } from "./store";
import { connect } from "react-redux";

const _Manufacturers = ({ manufacturers, createCar }) => {
  return (
    <div>
      <button onClick={createCar}>Add Car</button>
      <ul className = 'ulCars'>
        {manufacturers.map((manufacturer) => (
          <li key={manufacturer.id}>
            {manufacturer.name}
            <Models manufacturer={manufacturer} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    createCar: () => dispatch(createRandomCar()),
  };
};

const mapStateToProps = (state) => state;

const Manufacturers = connect(
  mapStateToProps,
  mapDispatchToProps
)(_Manufacturers);

export default Manufacturers;
