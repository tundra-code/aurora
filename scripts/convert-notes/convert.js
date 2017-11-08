const fs = require("fs");
const { saveNote } = require("../../lib/io");
const draftJS = require("draft-js");
const { NoteModel } = require("../../lib/note");

function get_items_from_file(file) {
  const content = fs.readFileSync(file);
  return JSON.parse(content);
}

function create_note_object(item) {
  const content = draftJS.ContentState.createFromText(item.text);
  const editorState = draftJS.EditorState.createWithContent(content);
  return new NoteModel(editorState, "aurora-base", item.tags, []);
}

async function convert() {
  const datasetFile = process.argv[2];
  const items = get_items_from_file(datasetFile);

  for (const item of items) {
    const note = create_note_object(item);
    await saveNote(note);
  }
}

convert();
