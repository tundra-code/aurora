import { CardAtBottomEditor } from "../index.js";
import React from "react";

describe("CardAtBottomEditor", () => {
  it("is exported and exists", () => {
    expect(CardAtBottomEditor).toBeDefined();
  });

  it("is a valid React element", () => {
    const element = (
      <CardAtBottomEditor onSubmit={() => {}} onChange={() => {}} />
    );
    expect(React.isValidElement(element)).toBe(true);
  });
});
