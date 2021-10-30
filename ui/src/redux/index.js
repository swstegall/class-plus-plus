import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import appReducer from "./reducers";

const consoleMessages = (_) => (next) => (action) => {
  let result;
  result = next(action);
  return result;
};

const store = (initialState = {}) => {
  return configureStore({
    reducer: appReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(logger).concat(consoleMessages),
    devTools: true,
    preloadedState: initialState,
  });
};

export default store;
