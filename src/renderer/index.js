import React from "react";
import ReactDOM from "react-dom";
import ScreenManager from "./ScreenManager";
import { Provider } from "react-redux";
import { setPreferences } from "./redux/actions";
import { loadPreferences } from "./lib/io";
import configureStore from "./redux/configureStore";
import Draggable from "./lib/ui/Draggable";

const store = configureStore();

class Aurora extends React.Component {
  constructor(props) {
    super(props);

    loadPreferences().then(prefs => {
      store.dispatch(setPreferences(prefs));
    });
  }

  render() {
    return (
      <Provider store={store}>
        <Draggable dragRegionSize="50px">
          <ScreenManager />
        </Draggable>
      </Provider>
    );
  }
}

// Add Electron to the page
document.body.innerHTML = `<div id="root"></div>`;
ReactDOM.render(<Aurora />, document.getElementById("root"));
