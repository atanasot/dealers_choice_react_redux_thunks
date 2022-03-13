import React from "react";

const Models = (props) => {
    const car = props.car
  return (
    <ul>
      {car.models.map((model) => (
        <li key={model.id}>{model.name}</li>
      ))}
    </ul>
  );
};

export default Models;
