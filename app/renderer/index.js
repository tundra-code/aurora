import React from "react";
import ReactDOM from "react-dom";
import Electron from "./components/Electron.js";
import Core from "../../lib/core";
import { Store } from "../../lib/mutate";

const render = Page => {
  ReactDOM.render(
    <Electron>
      <Page />
    </Electron>,
    document.getElementById("root")
  );
};

export default {
  index: () => {
    render(Core);
  },
  mutations: () => {
    render(Store);
  }
};
