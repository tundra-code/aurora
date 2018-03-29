import React from "react";
import Core from "../lib/core";
import { Store } from "../lib/mutate";
import { connect } from "react-redux";
import rendererEvents from "../lib/electron-events/renderer";
import { setScreen } from "../redux/actions";
import { screen } from "../redux/selectors";
import { exportNotes, importNotes } from "../lib/io";

class ScreenManager extends React.Component {
  constructor(props) {
    super(props);

    // Listen for electron screen change events and pass them through as a Redux action
    // The general flow here is basically:
    // 1. User clicks on menu item
    // 2. Menu item launches an electron event to change the screen
    // 3. We receive the event here
    // 4. We send Redux a dispatch that tells it to change the screen
    // 5. ScreenManager treats the action like any other state change
    rendererEvents.onChangeScreen((event, screen) => {
      props.dispatch(setScreen(screen));
    });
    rendererEvents.onExportNotes((event, filepath) => {
      exportNotes(filepath);
    });
    rendererEvents.onImportNotes((event, filepath) => {
      importNotes(filepath);
    });
  }

  render() {
    return this.props.screen;
  }
}

const Screens = {
  main: <Core />,
  store: <Store />
};

const mapStateToProps = state => {
  return {
    screen: Screens[screen(state)] || Screens.main
  };
};

export default connect(mapStateToProps)(ScreenManager);
