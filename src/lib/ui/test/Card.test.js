import React from "react";
import Card from "../Card.js";
import { Themed } from "../../theme";
import renderer from "react-test-renderer";

describe("Card", () => {
  it("is defined", () => {
    expect(Card).toBeDefined();
  });

  it("renders correctly", () => {
    const tree = renderer
      .create(
        <Themed>
          <Card>
            <div>Hello I am some content</div>
          </Card>
        </Themed>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
