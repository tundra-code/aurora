import React from "react";
import StoreSearchBar from "../StoreSearchBar";
import { withTheme } from "../../../theme";
import expectMatchesSnapshot from "../../../test-util/expectMatchesSnapshot";

const StoreSearchBarInContext = withTheme(StoreSearchBar);

describe("StoreSearchBar", () => {
  it("renders correctly", () => {
    expectMatchesSnapshot(<StoreSearchBarInContext onChange={() => {}} />);
  });
});
