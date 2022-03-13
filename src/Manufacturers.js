import React from "react";
import Models from "./Models";

const Manufacturers = (props) => {
  const cars = props.cars;
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

export default Manufacturers;
