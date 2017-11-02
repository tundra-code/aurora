import { Button, PrimaryButton, SuccessButton, DangerButton } from "../Buttons";
import renderer from "react-test-renderer";
import { withTheme } from "../../theme";
import React from "react";

const expectRendersCorrectly = Component => {
  const tree = renderer.create(<Component> {"foo"}</Component>).toJSON();
  expect(tree).toMatchSnapshot();
};

test("Button renders correctly", () => {
  expectRendersCorrectly(withTheme(Button));
});

test("PrimaryButton renders correctly", () => {
  expectRendersCorrectly(withTheme(PrimaryButton));
});

test("SuccessButton renders correctly", () => {
  expectRendersCorrectly(withTheme(SuccessButton));
});

test("DangerButton renders correctly", () => {
  expectRendersCorrectly(withTheme(DangerButton));
});
