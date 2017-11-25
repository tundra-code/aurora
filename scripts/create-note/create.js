const { saveNote } = require("../../src/lib/io");
const { newNote } = require("../../src/lib/test-util/note-util");

const text = process.argv[2];
const tags = [];
for (let i = 3; i < process.argv.length; i++) {
  tags.push(process.argv[i]);
}
saveNote(newNote(text, tags));
console.log("Created note.");
