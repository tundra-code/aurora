import { Editor } from "../index.js";
import React from "react";
import { EditorState } from "draft-js";
import expectMatchesSnapshot from "../../test-util/expectMatchesSnapshot";
import configureStore from "../../../redux/configureStore";
import { Provider } from "react-redux";

const store = configureStore();

jest.mock("draft-js/lib/generateRandomKey", () => () => "123");

describe("Editor", () => {
  it("is exported and exists", () => {
    expect(Editor).toBeDefined();
  });

  it("is a valid React element", () => {
    const element = <Editor ourEditorState={EditorState.createEmpty()} />;
    expect(React.isValidElement(element)).toBe(true);
  });

  it("renders correctly", () => {
    const superEditor = (
      <Provider store={store}>
        <Editor ourEditorState={EditorState.createEmpty()} />
      </Provider>
    );
    expectMatchesSnapshot(superEditor);
  });
});
