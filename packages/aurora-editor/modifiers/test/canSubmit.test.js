import StatelessEditor from "../../StatelessEditor.js";
import React from "react";
import canSubmit from "../canSubmit.js";
import { shallow } from "enzyme";
import { EditorState } from "draft-js";

const wrapper = () => {
  const SubmitEditor = canSubmit(StatelessEditor);
  return shallow(
    <SubmitEditor onSubmit={() => {}} editorState={EditorState.createEmpty()} />
  );
};

describe("canSubmit", () => {
  test("it is defined", () => {
    expect(canSubmit(StatelessEditor)).toBeDefined();
  });

  test("it has a 'handleKeyCommand' prop", () => {
    expect(wrapper().prop("handleKeyCommand")).toBeDefined();
  });

  test("it has a 'keyBindingFn' prop", () => {
    expect(wrapper().prop("keyBindingFn")).toBeDefined();
  });
});
