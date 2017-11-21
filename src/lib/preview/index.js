import Preview from "./Preview.js";
import React from "react";
import { deSerializeContent, EDITOR_NAME } from "../editor";

const MAX_PREVIEW_LENGTH = 40;

function renderPreview(preview) {
  return <Preview preview={preview} />;
}

function formatText(text) {
  const newText = text ? text : "New Note";
  const formattedText =
    newText.length > MAX_PREVIEW_LENGTH
      ? newText.substring(0, MAX_PREVIEW_LENGTH - 3) + "..."
      : newText;
  return formattedText;
}

function serializePreview(note) {
  if (note.content[note.mutationName] === null) {
    return "No preview";
  }
  const editorState = deSerializeContent(note.content[EDITOR_NAME]);
  const text = editorState.getCurrentContent().getFirstBlock().text;
  return { text: formatText(text) };
}

export { renderPreview, serializePreview };
