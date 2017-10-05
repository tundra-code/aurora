import { Editor } from "../index.js";
import React from "react";
import { EditorState } from "draft-js";

describe("Editor", () => {
  it("is exported and exists", () => {
    expect(Editor).toBeDefined();
  });

  it("is a valid React element", () => {
    const element = (
      <Editor editorState={EditorState.createEmpty()} onChange={() => {}} />
    );
    expect(React.isValidElement(element)).toBe(true);
  });
});
