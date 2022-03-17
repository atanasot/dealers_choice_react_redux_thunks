import { createStore, applyMiddleware, combineReducers } from "redux";
import loggerMiddleware from "redux-logger";
import thunks from "redux-thunk";
import axios from "axios";

// Action constants
const LOADED = "LOADED";
const LOAD_MANUFACTURERS = "LOAD_MANUFACTURERS";
const CREATE_CAR = "CREATE_CAR";
const DELETE_CAR = "DELETE_CAR";

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
      if (manufacturer.models.length) {
        manufacturer.models = manufacturer.models.filter(
          (model) => model.id !== action.modelId
        );
        acc.push(manufacturer);
        return acc;
      } else {
        acc.push(manufacturer);
        return acc;
      }
    }, []);
  }
  return state;
};

const loadingReducer = (state = true, action) => {
  if (action.type === LOADED) {
    state = action.loading;
  }
  return state;
};

//********************thunks******************************

export const fetchAllManufacturers = () => {
  return async (dispatch) => {
    const manufacturers = (await axios.get("/api/manufacturers")).data;
    dispatch(loadManufacturers(manufacturers));
  };
};

export const createRandomCar = () => {
  return async (dispatch) => {
    const randomCar = (await axios.post("/api/manufacturers")).data;
    dispatch(createCarAction(randomCar));
  };
};

export const deleteModel = (modelId) => {
  return async (dispatch) => {
    await axios.delete(`/api/manufacturers/models/${modelId}`);
    dispatch(deleteCarAction(modelId));
  };
};

export const loadingThunk = () => {
  return async (dispatch) => {
    dispatch(loaded());
  };
};

// Combine reducers
const reducer = combineReducers({
  manufacturers: carsReducer,
  loading: loadingReducer,
});

const store = createStore(reducer, applyMiddleware(loggerMiddleware, thunks));

// ***********************Action creators*************************
const loaded = () => {
  return {
    type: LOADED,
    loading: false,
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
    randomCar,
  };
};

const deleteCarAction = (modelId) => {
  return {
    type: DELETE_CAR,
    modelId,
  };
};

export default store;
