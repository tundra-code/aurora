import StoreItem from "../StoreItem";
import React from "react";
import { withTheme } from "../../../theme";
import renderer from "react-test-renderer";
import sinon from "sinon";
import { mount } from "enzyme";

const StoreItemInContext = withTheme(StoreItem);

test("StoreItem is defined", () => expect(StoreItemInContext).toBeDefined());

describe("StoreItem", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(
        <StoreItemInContext
          title={"title"}
          description={"description"}
          onClick={() => {}}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("calls onClick when the button is clicked", () => {
    const onClickSpy = sinon.spy();
    const wrapper = mount(
      <StoreItemInContext
        title={"title"}
        description={"description"}
        onClick={onClickSpy}
      />
    );

    wrapper.find("button").simulate("click");
    expect(onClickSpy.called).toBe(true);
  });
});
