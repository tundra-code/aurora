const MAX_PREVIEW_LENGTH = 40;

function formatText(text) {
  const newText = text ? text : "New Note";
  const formattedText =
    newText.length > MAX_PREVIEW_LENGTH
      ? newText.substring(0, MAX_PREVIEW_LENGTH - 3) + "..."
      : newText;
  return formattedText;
}

export function serializePreview(editorState) {
  if (editorState === null) {
    return { text: "No preview" };
  }
  const text = editorState.getCurrentContent().getFirstBlock().text;
  return { text: formatText(text) };
}
