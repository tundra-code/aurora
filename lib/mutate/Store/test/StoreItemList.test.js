import React from "react";
import StoreItemList from "../StoreItemList";
import renderer from "react-test-renderer";
import { withTheme } from "../../../theme";

const StoreItemListInContext = withTheme(StoreItemList);

describe("StoreItemList", () => {
  it("renders correctly with no items", () => {
    const dummyItems = [];
    const tree = renderer
      .create(<StoreItemListInContext items={dummyItems} onClick={() => {}} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
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
    const tree = renderer
      .create(<StoreItemListInContext items={dummyItems} onClick={() => {}} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
