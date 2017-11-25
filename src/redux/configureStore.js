import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "./reducers";

export default function configureStore(preloadedState) {
  const middlewares = [thunkMiddleware];

  if (process.env.LOG_REDUX && process.env.LOG_REDUX === "true") {
    const { logger } = require(`redux-logger`);

    middlewares.push(logger);
  }

  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(...middlewares)
  );
}
