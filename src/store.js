
import { createStore, applyMiddleware, combineReducers } from "redux";
import loggerMiddleware from "redux-logger";
import thunks from "redux-thunk";
import axios from "axios";


// Action constants
const LOADED = "LOADED";
const LOAD_CARS = "LOAD_CARS";

const carsReducer = (state = [], action) => {
  if (action.type === LOAD_CARS) {
    state = action.cars;
  }
  if (action.type === "CREATE_CAR") {
    state = [...state, action.randomCar];
  }
  return state;
};

const loadingReducer = (state = true, action) => {
  if (action.type === LOADED) {
    state = false;
  }
};


//thunks

export const fetchAllCars = () => {
  return async (dispatch) => {
    const cars = (await axios.get("/api/cars")).data;
    dispatch({
      type: LOAD_CARS,
      cars,
    });
  };
};


export const createRandomCar = () => {
  return async (dispatch) => {
    const randomCar = (await axios.post("/api/cars")).data; 
    dispatch({
      type: "CREATE_CAR",
      randomCar,
    });
  };
};


//this is the reducer
// const store = createStore((state = initialState, action) => {
//   if (action.type === LOADED) {
//     state = { ...state, loading: false };
//   }
//   if (action.type === LOAD_CARS) {
//     state = { ...state, cars: action.cars };
//   }
//   if (action.type === 'CREATE_CAR') {
//     state = {...state, cars: [...state.cars, action.car]}
//   }

//   return state;
// });


const reducer = combineReducers({
  cars: carsReducer,
  //loading: loadingReducer
})

const store = createStore(
  reducer,
  applyMiddleware(loggerMiddleware, thunks)
);


// Action creators
const loaded = () => {
  return {
    type: LOADED,
  };
};

const loadCars = (cars) => {
  return {
    type: LOAD_CARS,
    cars,
  };
};

export default store;
export { loaded, loadCars };
