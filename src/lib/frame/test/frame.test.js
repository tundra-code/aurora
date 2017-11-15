import Frame from "../index.js";
import React from "react";
import { EditorState } from "draft-js";
import { Editor } from "../../editor";
import expectMatchesSnapshot from "../../test-util/expectMatchesSnapshot";
import configureStore from "../../../redux/configureStore";
import { Provider } from "react-redux";

const store = configureStore();

jest.mock("draft-js/lib/generateRandomKey", () => () => "123");

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

  it("renders correctly", () => {
    const superFrame = (
      <Provider store={store}>
        <Frame />
      </Provider>
    );
    expectMatchesSnapshot(superFrame);
  });
});
