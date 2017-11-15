const { saveNote } = require("../../src/lib/io");
const draftJS = require("draft-js");
const { NoteModel } = require("../../src/lib/note");
const { newNote } = require("../../src/lib/test-util/note-util");

const text = process.argv[2];
saveNote(newNote(text));
console.log("Created note.");
