const preferences = {
  username: "Bob",
  lastNote: 2,
  color: "red"
};

function noteExistsIn(note, notes) {
  for (let i = 0; i < notes.length; i++) {
    if (notes[i].uuid === note.uuid) {
      return true;
    }
  }
  return false;
}

export { noteExistsIn, preferences };
