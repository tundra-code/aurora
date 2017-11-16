import React from "react";
import Core from "../lib/core";
import { Store } from "../lib/mutate";
import { connect } from "react-redux";
import rendererEvents from "../lib/electron-events/renderer";
import { setScreen } from "../redux/actions";

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
    screen: Screens[state.app.screen] || Screens.main
  };
};

export default connect(mapStateToProps)(ScreenManager);
