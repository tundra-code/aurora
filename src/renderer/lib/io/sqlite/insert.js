import { noteFromNoteModel, Tags, tagFromTagModel } from "./models.js";
import { loadDB } from "./setup.js";
import { saveNoteContent } from "../util.js";
const Promise = require("bluebird");

function getTagModels(tags, noteID) {
  return tags.map(tag => tagFromTagModel(tag, noteID));
}

function assingIdsToObjects(objects, data) {
  for (let i = 0; i < objects.length; i++) {
    objects[i].id = data[i].id;
  }
}

async function saveTags(note) {
  const tags = Tags.forge(getTagModels(note.tags, note.id));
  return Promise.all(tags.invokeMap("save")).then(savedTags => {
    assingIdsToObjects(note.tags, savedTags);
  });
}

async function insertNote(note) {
  await loadDB().catch(err => {
    throw new Error("Failed to load database: " + err);
  });

  const bookshelfNote = noteFromNoteModel(note);
  saveNoteContent(note);
  const savedNote = await bookshelfNote.save();

  note.id = savedNote.id;
  note.created_at = savedNote.attributes.created_at;
  note.updated_at = savedNote.attributes.updated_at;
  return saveTags(note);
}

export { insertNote };
