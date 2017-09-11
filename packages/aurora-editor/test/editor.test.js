import { Editor } from "../index.js";
import React from "react";

describe("Editor", () => {
  it("is exported and exists", () => {
    expect(Editor).toBeDefined();
  });

  it("is a valid React element", () => {
    const element = <Editor onSubmit={() => {}} onChange={() => {}} />;
    expect(React.isValidElement(element)).toBe(true);
  });
});
