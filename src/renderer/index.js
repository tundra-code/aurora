import React from "react";
import ReactDOM from "react-dom";
import ScreenManager from "./ScreenManager";
import { Provider } from "react-redux";
import reducers from "../redux/reducers";
import { setPreferences } from "../redux/actions";
import { createStore } from "redux";
import renderer from "../lib/electron-events/renderer";

const store = createStore(reducers);

class Aurora extends React.Component {
  constructor(props) {
    super(props);

    renderer.onGetPreferences((event, preferences) => {
      store.dispatch(setPreferences(preferences));
    });

    renderer.sendGetPreferences();
  }

  render() {
    return (
      <Provider store={store}>
        <ScreenManager />
      </Provider>
    );
  }
}

// Add Electron to the page
document.body.innerHTML = `<div id="root"></div>`;
ReactDOM.render(<Aurora />, document.getElementById("root"));
