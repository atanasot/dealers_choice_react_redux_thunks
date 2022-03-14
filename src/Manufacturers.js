import React, { Component } from "react";
import Models from "./Models";
import store from "./store";
import connect from "./connect";

// method connect automatically subscribes and helps props getting passed in func
//pass in  component in connect
// dynamically creating a class


const Manufacturers = ({ cars }) => {
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
};

export default connect(Manufacturers);
