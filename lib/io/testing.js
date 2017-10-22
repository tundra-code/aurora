const Note = require("../note");
const draftjs = require("draft-js");
const io = require("./index.js");
const editor = require("../editor");

const newNote = () => {
  const content = draftjs.EditorState.createWithContent(
    draftjs.ContentState.createFromText("Some Text")
  );
  return new Note.NoteModel(editor.serializeContent(content), "Aurora-Editor", [
    (new Note.Attribute("title", "My note", true),
    new Note.Attribute("class", "math"))
  ]);
};

function callback() {
  console.log("Done");
}
const note = newNote();
io.saveNote(note, callback);
