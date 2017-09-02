import React from "react";
import { shallow } from "enzyme";
import Core from "../index.js";
import Editor from "../../aurora-editor";

const wrapper = shallow(<Core />);

describe("Core", () => {
  it("exists and is exported", () => {
    expect(Core).toBeDefined();
  });

  it("has at least one editor", () => {
    expect(wrapper.find(Editor).length).toBeGreaterThan(0);
  });
});
