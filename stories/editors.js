import React from "react";
import { action } from "@storybook/addon-actions";
import { EditorState, ContentState } from "draft-js";
import { Editor, modifiers } from "../packages/aurora-editor";

function stateFromText(text) {
  return EditorState.createWithContent(ContentState.createFromText(text));
}

const canSubmit = () => {
  const { canSubmit, canType } = modifiers;
  const MyEditor = canType(canSubmit(Editor));
  const message =
    "Click on the text and press Shift-Enter to run a submit event.";
  return (
    <MyEditor
      onSubmit={action("submit")}
      defaultEditorState={stateFromText(message)}
    />
  );
};

export { canSubmit };
