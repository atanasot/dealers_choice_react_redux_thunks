import React, { Component } from "react";
import Models from "./Models";
import store, { createRandomCar } from "./store";
import { connect } from "react-redux";


// method connect automatically subscribes and helps props getting passed in func
//pass in  component in connect
// dynamically creating a class

const _Manufacturers = ({ manufacturers, createCar}) => {
  return (
    <div>
      <button onClick={createCar}>Add Car</button>
      <ul>
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
    createCar: () => dispatch(createRandomCar()), //coming from store
  };
};

const mapStateToProps = ({ manufacturers }) => ({ manufacturers }); //passes the state as props // need provider component //maybe this should be state???

const Manufacturers = connect(
  mapStateToProps,
  mapDispatchToProps
)(_Manufacturers);

//export default connect(mapStateToProps, mapDispatchToProps)(Manufacturers); //pass in mapStateToProps

export default Manufacturers;
