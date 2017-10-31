import React from "react";
import StoreSearchBar from "../StoreSearchBar";
import renderer from "react-test-renderer";
import { withTheme } from "../../../theme";

const StoreSearchBarInContext = withTheme(StoreSearchBar);

describe("StoreSearchBar", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<StoreSearchBarInContext onChange={() => {}} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
