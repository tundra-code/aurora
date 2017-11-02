import React from "react";
import { shallow } from "enzyme";
import Electron from "../Electron.js";
import Draggable from "../Draggable.js";

const wrapper = shallow(
  <Electron>
    <p>Cats</p>
  </Electron>
);

describe("Electron", () => {
  it("exists and is exported", () => {
    expect(Electron).toBeDefined();
  });

  it("contains a draggable header", () => {
    expect(wrapper.find(Draggable).length).toBe(1);
  });
});
