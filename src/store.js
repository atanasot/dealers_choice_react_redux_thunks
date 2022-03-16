import { createStore, applyMiddleware, combineReducers } from "redux";
import loggerMiddleware from "redux-logger";
import thunks from "redux-thunk";
import axios from "axios";

// Action constants
const LOADED = "LOADED";
const LOAD_MANUFACTURERS = "LOAD_MANUFACTURERS";

const carsReducer = (state = [], action) => {
  if (action.type === LOAD_MANUFACTURERS) {
    state = action.manufacturers;
  }
  if (action.type === "CREATE_CAR") {
    state = state.map((manufacturer) => {
      if (manufacturer.id === action.randomCar.manufacturerId) {
        manufacturer.models = manufacturer.models.concat(action.randomCar);
      }
      return manufacturer;
    });
  }
  return state;
};

//????????
// const loadingReducer = (state = true, action) => {
//   if (action.type === LOADED) {
//     state = false;
//   }
// };

//thunks

export const fetchAllManufacturers = () => {
  return async (dispatch) => {
    const manufacturers = (await axios.get("/api/manufacturers")).data;
    dispatch({
      type: LOAD_MANUFACTURERS,
      manufacturers,
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
//   if (action.type === LOAD_MANUFACTURERS) {
//     state = { ...state, cars: action.cars };
//   }
//   if (action.type === 'CREATE_CAR') {
//     state = {...state, cars: [...state.cars, action.car]}
//   }

//   return state;
// });

const reducer = combineReducers({
  manufacturers: carsReducer,
  //loading: loadingReducer
});

const store = createStore(reducer, applyMiddleware(loggerMiddleware, thunks));

// Action creators
const loaded = () => {
  return {
    type: LOADED,
  };
};

const loadManufacturers = (manufacturers) => {
  return {
    type: LOAD_MANUFACTURERS,
    manufacturers,
  };
};

export default store;
export { loaded, loadManufacturers };
