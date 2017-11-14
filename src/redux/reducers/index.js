import { SET_SCREEN, SET_TOAST, SET_PREFERENCES } from "../actions";

function app(state = {}, action) {
  switch (action.type) {
    case SET_SCREEN:
      return Object.assign({}, state, {
        screen: action.screen
      });
    case SET_TOAST:
      return Object.assign({}, state, {
        toast: { message: action.message, type: action.toastType }});
    case SET_PREFERENCES:
      return Object.assign({}, state, {
        preferences: action.preferences
      });
    default:
      return state;
  }
}

export default app;
