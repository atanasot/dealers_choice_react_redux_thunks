import React, { Component } from "react";
import store from "./store";
import { connect } from "react-redux";

// class Models extends Component {
//   constructor() {
//     super();
//     this.state = {
//       cars: store.getState().cars,
//     };
//   }
//   componentWillUnmount() {
//     this.unsubscribe();
//   }
//   componentDidMount() {
//     this.unsubscribe = store.subscribe(() => {
//       this.setState({
//         cars: store.getState().cars,
//       });
//     });
//   }
//   render() {
//     const car = this.props.car;
//     return (
//       <ul>
//         {car.models.map((model) => (
//           <li key={model.id}>{model.name}</li>
//         ))}
//       </ul>
//     );
//   }
// }

const Models = ({ manufacturer }) => {
  //console.log(this.props)   //props and this.props is undefined
  //console.log(manufacturer);
  return (
    <ul>
      {manufacturer.models.map((model) => (
        <li key={model.id}>{model.name}</li>
      ))}
    </ul>
  );
};

const mapStateToProps = (state) => state; 

export default connect(mapStateToProps)(Models);

//****************this is working *********************/
// const Models = (props) => {
//     console.log(props)  //we get a sincle model
//   //console.log(props.car)  here props in an object
//   return (
//     <ul>
//       {props.car.models.map((model) => (
//         <li key={model.id}>{model.name}</li>
//       ))}
//     </ul>
//   );
// };

// export default Models;
