import React from "react";
import ReactDOM from "react-dom";
import ScreenManager from "./ScreenManager";
import { Provider } from "react-redux";
import reducers from "../redux/reducers";
import { createStore } from "redux";

document.body.innerHTML = `<div id="root"></div>`;

const store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <ScreenManager />
  </Provider>,
  document.getElementById("root")
);
