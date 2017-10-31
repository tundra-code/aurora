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
  const attrs = [];
  attributes.forEach(attr => {
    attrs.push(attrFromAttrModel(attr, noteID));
  });
  return attrs;
}

function getTagModels(tags, noteID) {
  const ts = [];
  tags.forEach(tag => {
    ts.push(tagFromTagModel(tag, noteID));
  });
  return ts;
}

function saveAttributes(note, callback, onFailure) {
  const attributes = Attributes.forge(
    getAttributeModels(note.attributes, note.id)
  );
  Promise.all(attributes.invokeMap("save"))
    .then(() => {
      executeIfDefined(callback);
    })
    .catch(err => {
      executeIfDefined(onFailure, err);
    });
}

function saveTags(note, callback, onFailure) {
  const tags = Tags.forge(getTagModels(note.tags, note.id));
  Promise.all(tags.invokeMap("save"))
    .then(() => {
      saveAttributes(note, callback, onFailure);
    })
    .catch(err => {
      executeIfDefined(onFailure, err);
    });
}

function insertNote(note, callback, onFailure) {
  loadDB()
    .then(() => {
      const bookshelfNote = noteFromNoteModel(note);
      saveNoteContent(note);
      bookshelfNote
        .save()
        .then(savedNote => {
          note.id = savedNote.id;
          saveTags(note, callback, onFailure);
        })
        .catch(err => {
          executeIfDefined(onFailure, err);
        });
    })
    .catch(err => {
      throw new Error("Failed to load database: " + err);
    });
}

export { insertNote };
