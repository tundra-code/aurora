import {
  Attributes,
  noteFromNoteModel,
  attrFromAttrModel,
  Tags,
  tagFromTagModel
} from "./models.js";
import { loadDB } from "./setup.js";
import { saveNoteContent, executeIfDefined } from "../util.js";
const Promise = require("bluebird");

function getAttributeModels(attributes, noteID) {
  return attributes.map(attr => attrFromAttrModel(attr, noteID));
}

function getTagModels(tags, noteID) {
  return tags.map(tag => tagFromTagModel(tag, noteID));
}

function assingIdsToObjects(objects, data) {
  for (let i = 0; i < objects.length; i++) {
    objects[i].id = data[i].id;
  }
}

function saveAttributes(note, callback, onFailure) {
  const attributes = Attributes.forge(
    getAttributeModels(note.attributes, note.id)
  );
  Promise.all(attributes.invokeMap("save"))
    .then(savedAttrs => {
      assingIdsToObjects(note.attributes, savedAttrs);
      executeIfDefined(callback);
    })
    .catch(err => {
      executeIfDefined(onFailure, err);
    });
}

function saveTags(note, callback, onFailure) {
  const tags = Tags.forge(getTagModels(note.tags, note.id));
  return Promise.all(tags.invokeMap("save"))
    .then(savedTags => {
      assingIdsToObjects(note.tags, savedTags);
      saveAttributes(note, callback, onFailure);
    })
    .catch(err => {
      executeIfDefined(onFailure, err);
    });
}

async function insertNote(note, callback, onFailure) {
  await loadDB().catch(err => {
    throw new Error("Failed to load database: " + err);
  });

  const bookshelfNote = noteFromNoteModel(note);
  saveNoteContent(note);
  const savedNote = await bookshelfNote.save().catch(err => {
    executeIfDefined(onFailure, err);
  });

  note.id = savedNote.id;
  note.created_at = savedNote.attributes.created_at;
  note.updated_at = savedNote.attributes.updated_at;
  return saveTags(note, callback, onFailure);
}

export { insertNote };
