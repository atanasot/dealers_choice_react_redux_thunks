import { createStore, applyMiddleware, combineReducers } from "redux";
import loggerMiddleware from "redux-logger";
import thunks from "redux-thunk";
import axios from "axios";

// Action constants
const LOADED = "LOADED";
const LOAD_MANUFACTURERS = "LOAD_MANUFACTURERS";
const CREATE_CAR = "CREATE_CAR"
const DELETE_CAR = "DELETE_CAR"

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
  if (action.type === DELETE_CAR) {
    return state.reduce((acc, manufacturer) => {
      if (manufacturer.models.length) {   // if manufacturer has models, filter them and push them into acc
        acc.push(manufacturer.models.filter(model => model.id !== action.model.id))
      }
      return acc
    },[])
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

export const deleteModel = (model) => {
  return async(dispatch) => {
    await axios.delete(`/api/manufacturers/models/${model.id}`)
    dispatch(deleteCarAction(model))
  }
}

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

const deleteCarAction = (model) => {
  return {
    type: DELETE_CAR,
    model
  }
}

export default store;
//export { loaded, loadManufacturers };
