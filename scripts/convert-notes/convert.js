const fs = require("fs");
const { save } = require("../../packages/aurora-file-io");
const draftJS = require("draft-js");
const { NoteModel } = require("../../packages/aurora-note");

function get_items_from_file(file) {
  const content = fs.readFileSync(file);
  return JSON.parse(content);
}

function create_note_object(item) {
  const content = draftJS.ContentState.createFromText(item.text);
  const editorState = draftJS.EditorState.createWithContent(content);
  return new NoteModel(editorState, { id: item.uuid });
}

const datasetFile = process.argv[2];
const items = get_items_from_file(datasetFile);

items.forEach(item => {
  const note = create_note_object(item);
  save(note);
});
