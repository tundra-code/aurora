import renderer from "react-test-renderer";
import { Themed } from "../theme";
import React from "react";

/**
 * A wrapper around a generic snapshot test
 * 
 * @example
 * test("it renders correctly", () => {
 *   expectMatchesSnapshot(<Foo bar={"jazz"} />);
 * });
 */
function expectMatchesSnapshot(RenderedComponent) {
  if (!expect) {
    throw new Error(
      "expectMatchesSnapshot was used outside of a jest environment!"
    );
  }

  const tree = renderer.create(<Themed> {RenderedComponent} </Themed>).toJSON();
  expect(tree).toMatchSnapshot();
}

export default expectMatchesSnapshot;
