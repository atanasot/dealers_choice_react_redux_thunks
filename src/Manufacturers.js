import React, { Component } from "react";
import Models from "./Models";
import store, {createRandomCar} from "./store";
import { connect } from "react-redux";
import axios from "axios";

// method connect automatically subscribes and helps props getting passed in func
//pass in  component in connect
// dynamically creating a class

const _Manufacturers = ({ cars, createCar }) => {
  //console.log(createCar()) smt is wrong here
  //pass in CreateCar
  //console.log(sayHi())
  return (
    <div>
      <button onClick={createCar}>Add Car</button>
      <ul>
        {cars.map((car) => (
          <li key={car.id}>
            {car.name}
            <Models car={car} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    createCar: () => dispatch(createRandomCar()) //coming form store
  };
};

const mapStateToProps = ({cars}) => ({cars}); //passes the state as props // need provider component //maybe this should be state???

const Manufacturers = connect(mapStateToProps, mapDispatchToProps)(_Manufacturers)

//export default connect(mapStateToProps, mapDispatchToProps)(Manufacturers); //pass in mapStateToProps

export default Manufacturers