import { Editor } from "../index.js";
import React from "react";
import { EditorState } from "draft-js";
import expectMatchesSnapshot from "../../test-util/expectMatchesSnapshot";

jest.mock("draft-js/lib/generateRandomKey", () => () => "123");

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

  it("renders correctly", () => {
    expectMatchesSnapshot(
      <Editor editorState={EditorState.createEmpty()} onChange={() => {}} />
    );
  });
});
