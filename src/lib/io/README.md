# IO
This component provides the functionality to save, delete, and load notes.
Additionally, it handles storing preferences.

## How to Use
Interacting with the IO functions is relatively simple. Almost all are done asynchronously and thus
require callbacks.

### Saving a note.
First, create a note (with associated attributes and tags).
```
const myNote = new NoteModel(
  serializeContent(content),
  "Aurora-Editor",
  [new Tag("java"), new Tag("sql")],
  [new Attribute("title", "My note", true), new Attribute("class", "math")]
);
```
Then, save the note. Optionally pass in callbacks for successful and unsuccessful saving.
```
saveNote(myNote).then(() => {
  console.log("Yay!")
}).catch(err => {
  console.log(err);
});
```
To edit the note in any way (including adding/removing attributes), just modify the
`NoteModel` object and save it again. It will update the new values. For example, to add a new attribute:
```
myNote.addAttribute(new Attribute("topic", "partial differential techniques"));
await saveNote(myNote);
```
For a list of functions that are handy to interact with the `NoteModel` object, check out the `README` in that module.

### Deleting a note.
Assuming we have a `NoteModel` object, to delete it, just call the function.
```
await deleteNote(ourNote);
```

### Loading notes.
To load notes, call the function. Your promise resolve should take in an array of `NoteModel`
objects. They will be ordered from most recently updated to least recently.
```
// using promise
loadNotes().then(notes => {
  console.log(await notes[0].getContent());
})

// using await
const notes = await loadNotes();
const content = await notes[0].getContent();
```
In this example, for the first note returned, we then call `getContent` to load in the content
from the associated note content file.

### Saving preferences
Pass in your JSON preferences object. Use the promise as you want.
```
await savePreferences(preferences);
```

### Loading preferences
Use the promise that takes in a JSON preferences object when loaded.
```
loadPreferences().then(pref => {
  console.log(pref);
});
```

## API
The main functions of IO are:
```
/*
  Saves the specified note. Overwrites an existing note with matching id.
  @param note : NoteModel
  @returns Promise
   */
function saveNote(note)

/*
  Deletes the specified note.
  @param note : NoteModel
  @returns Promise
   */
function deleteNote(note)

/*
  Loads all notes ordered by most recently updated to least recently.
  @returns Promise
   */
function loadNotes()

/*
Loads user preferences.
@returns Promise
 */
loadPreferences(onLoad, onFailure)

/*
Saves user preferences.
@params preferences : JSON object of preferences
@returns Promise
 */
savePreferences(preferences, onLoad, onFailure)
```

There are some additional functions that are exposed to work with files and folders in general:

```
auroraDirContext() => directoryContext (~/.aurora/<NODE_ENV>)

auroraRootContext() => directoryContext (~/.aurora)

auroraDirPath() => String (path to the aurora directory)

saveTo(data, fileName, dirContext) => Promise to save

saveToAsync(data, fileName, dirContext, callback, onFailure)

readFrom(fileName, dirContext) => fileData

readFromAsync(fileName, dirContext, callback, onFailure)

deleteFile(fileName, dirContext) => Promise to delete
```

## Data Storage
By default, the database is created at `HOME_DIR/.aurora/<NODE_ENV>/<NODE_ENV>.db`.
This is set in the `config/database.json` file, but please don't screw with it.

When running or testing, a `NODE_ENV` must be specified; this is the database where notes and attributes are stored.
The actual note content is stored in a file `<uuid>.aur` which lies in the `HOME_DIR/.aurora/<NODE_ENV>/notes` folder.

The preference object is stored at `HOME_DIR/.aurora/<NODE_ENV>/preferences.json`.
Note that there are different preferences and notes for each environment.

## Helpful Commands
All these commands are to be run from the root of the project.
Current `env` options are `development`, and `test`.
- `yarn run db-create-config`: this updates the `config/database.json` file to specify your `HOME_DIR/.aurora/` as where to store the database files. Note this only needs to be run once and launching the app will automatically run it. I guess if you want to do some fancy db-migration commands before launching the app then this is useful.
- `yarn db-migrate-create <migration-name>`: creates a new database migration file.
- `yarn db-up -e <env>`: Runs next needed migration(s) for this env, if applicable. Note this will not work if you have never run the application `yarn <env>` in this environment before.
- `yarn db-down -e <env>`: Rolls back one migration for this env, if applicable.
- `yarn db-reset -e <env>`: Resets all migrations for this env. Has the effect of emptying the database for this env. Note that this does not delete the `.aurora/<env>` folder so preferences do persist.
