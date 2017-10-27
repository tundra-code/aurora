import { Note } from "./models.js";
import { NoteModel } from "../../note";
import { loadDB } from "./setup.js";

function queryNotes(onLoad) {
  loadDB().then(() => {
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
        console.error("error: " + err);
      });
  });
}

export { queryNotes };
