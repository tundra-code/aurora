# IO
This component provides the functionality to save, delete, and load notes.
Additionally, it handles storing preferences.

## How to Use
Interacting with the IO functions is relatively simple. Almost all are done asynchronously and thus
require callbacks.

### Saving a note.
First, create a note (with associated attributes).
```
const myNote = new NoteModel(serializeContent(editorContent), "my-editor-mutation", [
  new Attribute("title", "My note", true),
  new Attribute("class", "math")
]);
```
Then, save the note. Optionally pass in callbacks for successful and unsuccessful saving.
```
saveNote(myNote, () => {
  console.log("Yay Saving!");
}, (err) => {
  console.log(err);
});
```
To edit the note in any way (including adding/removing attributes), just modify the
`NoteModel` object and save it again. It will update the new values. For example, to add a new attribute:
```
myNote.attributes.push(new Attribute("topic", "partial differential techniques"));
saveNote(myNote);
```

### Deleting a note.
Assuming we have a `NoteModel` object, to delete it, just call the function.
```
function deleteCallback() {
  console.log("Deleted");
}
deleteNote(myNote, deleteCallback);
```

### Loading notes.
To load notes, call the function. Your callback should take in an array of `NoteModel`
objects. They will be ordered from most recently updated to least recently.
```
loadNotes(notesLoaded, notes => {
  notes.forEach(note => {
    console.log(note.uuid); // access information
    note.getContent(content => {  // loading in content from associated file.
      console.log(content);
    });
  });
});
```
In this example, for each note returned, we then call `getContent` to load in the content
from the associated note content file.

### Saving preferences
Pass in your JSON preferences object. Pass in optional callback and failure callback.
```
savePreferences(preferences);
```

### Loading preferences
Pass in a callback that takes in a JSON preferences object when loaded.
```
loadPreferences(pref => {
  console.log(pref);
});
```

## API
The main functions of IO are:
```
/*
Saves the specified note. Overwrites an existing note with matching id.
note : NoteModel
onSuccess() : function invoked if successfully saved.
onFailure() : function invoked if failure to save.
 */
saveNote(note, onSuccess, onFailure)

/*
Deletes the specified note.
note : NoteModel
onSuccess() : function invoked if successfully deleted.
onFailure() : function invoked if failure to delete.
 */
deleteNote(note, onSuccess, onFailure)

/*
Loads all notes.
note : NoteModel
onLoad(note) : function invoked when a note is loaded. Takes in a note as a parameter.
onFailure(note) : function invoked if loading a specific note fails. Takes in the note as a parameter.
 */
loadNotes(onLoad, onFailure)

/*
Loads user preferences.
onLoad(preferences) : function invoked when preferences are loaded. Takes in the JSON preferences object.
onFailure() : function invoked if loading preferences fails.
 */
loadPreferences(onLoad, onFailure)

/*
Saves user preferences.
preferences : JSON object of preferences
onSuccess() : function invoked when preferences are saved.
onFailure() : function invoked if loading preferences fails.
 */
savePreferences(preferences, onLoad, onFailure)
```

There are some additional functions that are exposed to work with files and folders in general:

```
auroraDirContext() => directoryContext (a jetpack file system object)

auroraDirPath() => String (path to the aurora directory)

saveTo(data, fileName, dirContext) => Promise to save

saveToAsync(data, fileName, dirContext, callback, onFailure)

readFrom(fileName, dirContext) => fileData

readFromAsync(fileName, dirContext, callback, onFailure)

deleteFile(fileName, dirContext) => Promise to delete
```

## Data Storage
By default, the database is created in whichever directory the project is run from.
A `NODE_ENV` must be specified; this is the database where notes and attributes are stored.
The actual note content is stored in a file `<uuid>.aur` which lies in the `HOME_DIR/.aurora/<NODE_ENV>/notes` folder.
The preference object is stored at `HOME_DIR/.aurora/<NODE_ENV>/preferences.json`.
Note that there are different preferences and notes for each environment.

## Helpful Commands
All these commands are to be run from the root of the project.
Current `env` options are `dev`,`prod`, and `test`.
- `NAME=<migration-name> npm run db-migrate-create`: creates a new database migration file.
- `npm run <env>-up`: Runs next needed migration for this env, if applicable.
- `npm run <env>-down`: Rolls back one migration for this env, if applicable.
- `npm run <env>-reset`: Resets all migrations for this env. Has the effect of emptying the database for this env. Note that this does not delete the `.aurora/<env>` folder so preferences do persist.
