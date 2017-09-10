import React from "react";
import ReactDOM from "react-dom";
import Electron from "./components/Electron.js";

export default () => {
  ReactDOM.render(<Electron />, document.getElementById("root"));
};
