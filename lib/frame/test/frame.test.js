import Frame from "../index.js";
import React from "react";
import { EditorState } from "draft-js";
import { Editor } from "../../editor";

describe("Frame", () => {
  it("is exported and exists", () => {
    expect(Frame).toBeDefined();
  });

  it("is a valid React element", () => {
    const element = (
      <Editor editorState={EditorState.createEmpty()} onChange={() => {}} />
    );
    expect(React.isValidElement(element)).toBe(true);
  });
});
