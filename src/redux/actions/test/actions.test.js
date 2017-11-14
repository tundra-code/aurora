import { actionCreators, actionStrings } from "../util";

/**
 * This is a blanket test that tests every single action creator and function
 * to see if they follow the expected structure.
 */
test("every action has a defined 'type' attribute", () => {
  // Expect that every exported action creator function is returning a type that's also exported
  for (const creator of actionCreators()) {
    expect(actionStrings().includes(creator("foo").type)).toBe(true);
  }
});
