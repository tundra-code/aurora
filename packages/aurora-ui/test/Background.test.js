import React from "react";
import Background from "../Background.js";
import { Themed } from "../../aurora-theme";
import renderer from "react-test-renderer";

describe("Card", () => {
  it("is defined", () => {
    expect(Background).toBeDefined();
  });

  it("renders correctly", () => {
    const tree = renderer
      .create(
        <Themed>
          <Background>
            <div>Hello I am some content</div>
          </Background>
        </Themed>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
