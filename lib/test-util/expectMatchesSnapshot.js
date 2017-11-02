import renderer from "react-test-renderer";

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

  const tree = renderer.create(RenderedComponent).toJSON();
  expect(tree).toMatchSnapshot();
}

export default expectMatchesSnapshot;
