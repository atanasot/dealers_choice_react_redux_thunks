import { createStore, applyMiddleware, combineReducers } from "redux";
import loggerMiddleware from "redux-logger";
import thunks from "redux-thunk";
import axios from "axios";

// Action constants
const LOADED = "LOADED";
const LOAD_MANUFACTURERS = "LOAD_MANUFACTURERS";
const CREATE_CAR = "CREATE_CAR"

// Separated Reducers

const carsReducer = (state = [], action) => {
  if (action.type === LOAD_MANUFACTURERS) {
    state = action.manufacturers;
  }
  if (action.type === CREATE_CAR) {
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

//********************thunks******************************

export const fetchAllManufacturers = () => {
  return async (dispatch) => {
    const manufacturers = (await axios.get("/api/manufacturers")).data;
    dispatch(loadManufacturers(manufacturers));
  };
};

export const createRandomCar = () => {
  return async (dispatch) => {
    const randomCar = (await axios.post("/api/cars")).data;
    dispatch(createCarAction(randomCar));
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

// ***********************Action creators************************* -- they return obj
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

const createCarAction = (randomCar) => {
  return {
    type: CREATE_CAR,
    randomCar
  }
}

export default store;
//export { loaded, loadManufacturers };
