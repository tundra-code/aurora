import React from "react";
import StoreItemList from "../StoreItemList";
import { withTheme } from "../../../theme";
import expectMatchesSnapshot from "../../../test-util/expectMatchesSnapshot";

const StoreItemListInContext = withTheme(StoreItemList);

describe("StoreItemList", () => {
  it("renders correctly with no items", () => {
    const dummyItems = [];
    expectMatchesSnapshot(
      <StoreItemListInContext items={dummyItems} onClick={() => {}} />
    );
  });

  it("renders correctly with items", () => {
    const dummyItems = [
      {
        package: {
          name: "one",
          description: "desc_one"
        }
      },
      {
        package: {
          name: "two",
          description: "desc_two"
        }
      }
    ];
    expectMatchesSnapshot(
      <StoreItemListInContext items={dummyItems} onClick={() => {}} />
    );
  });
});
