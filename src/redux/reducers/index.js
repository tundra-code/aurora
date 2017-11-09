import { SET_SCREEN } from "../actions";

function app(state = {}, action) {
  switch (action.type) {
    case SET_SCREEN:
      return Object.assign({}, state, {
        screen: action.screen
      });
    default:
      return state;
  }
}

export default app;
