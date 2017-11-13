import React from "react";
import StoreItemList from "../StoreItemList";
import { withTheme } from "../../../theme";
import expectMatchesSnapshot from "../../../test-util/expectMatchesSnapshot";
import { Map } from "immutable";

const StoreItemListInContext = withTheme(StoreItemList);

describe("StoreItemList", () => {
  it("renders correctly with no items", () => {
    const dummyItems = Map();
    expectMatchesSnapshot(
      <StoreItemListInContext items={dummyItems} onClick={() => {}} />
    );
  });

  it("renders correctly with items", () => {
    const dummyItems = Map({
      foo: {
        package: {
          name: "one",
          description: "desc_one"
        }
      },
      bar: {
        package: {
          name: "two",
          description: "desc_two"
        }
      }
    });
    expectMatchesSnapshot(
      <StoreItemListInContext items={dummyItems} onClick={() => {}} />
    );
  });
});
