import React from "react";
import { shallow } from "enzyme";
import Feed from "../index.js";

describe("feed", () => {
  it("exists", () => {
    expect(Feed).toBeDefined();
  });

  it("has an Editor somewhere", () => {
    const wrapper = shallow(<Feed />);
    expect(wrapper.render().find(".DraftEditor-root").length).toBe(1);
  });

  it("has a note-wrapper", () => {
    const wrapper = shallow(<Feed />);
    expect(wrapper.render().find(".note-wrapper").length).toBe(1);
  });
});
