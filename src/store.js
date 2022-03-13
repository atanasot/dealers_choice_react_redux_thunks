import { createStore } from "redux";

const initialState = {
  cars: [],
  loading: true,
};

const store = createStore((state = initialState, action) => {
  if (action.type === "LOAD_CARS") {
    state = { ...state, cars: action.cars };
  }
  if (action.type === "LOADED") {
    state = { ...state, loading: false };
  }
  return state;
});

export default store;
