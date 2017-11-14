import { actionCreators } from "../../actions/util";
import app from "../index";

// All actions MUST return a state, even in an error.
test("all actions return a state", () => {
  actionCreators().forEach(creator => {
    expect(app({}, creator("i-am-just-some-text"))).toBeDefined();
  });
});

// Test that we're really creating copies and not just returning the
// same state. If we don't return copies, React will not update.
test("all actions return a new copy of the state", () => {
  actionCreators().forEach(creator => {
    const prevState = { rah: "nope" };
    expect(app(prevState, creator("ya")) !== prevState).toBe(true);
  });
});

// If the action doesn't exist at all, we SHOULD return the same state. (AKA do nothing)
test("if the action does not exist, we DO return the same state", () => {
  const prevState = { ya: "wjeio" };
  expect(
    app(prevState, "IDUNEXISTHAHAWHOEJWIEOIWAE33344#$*(") === prevState
  ).toBe(true);
});
