import { Note } from "./models.js";

function queryNotes(onLoad) {
  Note.query(qb => {
    qb.orderBy("updated_at", "DESC");
  })
    .fetchAll({ withRelated: ["attribute"] })
    .then(notes => {
      notes.forEach(note => {
        console.log(note.toJSON());
      });
      onLoad();
    })
    .catch(err => {
      console.error(err);
    });
}

export { queryNotes };
