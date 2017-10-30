import { Note } from "./models.js";
import { NoteModel } from "../../note";
import { loadDB } from "./setup.js";
import { executeIfDefined } from "../util.js";

function queryNotes(onLoad, onFailure) {
  loadDB()
    .then(() => {
      Note.query(qb => {
        qb.orderBy("updated_at", "DESC");
      })
        .fetchAll({ withRelated: ["attribute"] })
        .then(notes => {
          const noteObjects = [];
          notes.forEach(note => {
            noteObjects.push(NoteModel.fromDBData(note));
          });
          onLoad(noteObjects);
        })
        .catch(err => {
          executeIfDefined(onFailure, err);
        });
    })
    .catch(err => {
      throw new Error("Failed to load database: " + err);
    });
}

export { queryNotes };
