# Note
This component includes the note data model. The data model is useful for storing notes, loading from files, and interacting with notes in the user interface.

## Note Model
Notes are just json objects. They have these main keys:
- `id`: auto-incremented id
- `uuid`: a uuid
- `date`:
- `attributes`: this is an array of attribute objects. Attributes have:
  * `key`: a string naming the type of attribute (e.g. "title")
  * `value`: a string indicating the value of the attribute (e.g. "how to create a git branch")
  * `searchable`: Bool if this attribute should be searchable
- `content`: content of a note. This can really be anything, but it must come with an
`EditorSerializer` that can deserialize and serialize this specific content format.
- `EditorSerializer`: This must contain three functions:
  * `serialize`: takes in content and converts it to a format that can be saved.
  * `deSerialize`: can take in saved content and load it back into its original form.
  * `getID`: returns an identifier for this serializer.

Where content must contain an attribute `editor-extension`.

## To use:
To instantiate a note:
```
NoteModel(editorState: EditorState, attributes: [Attribute], options: JSON): NoteModel
```
Where `options` could contain a value for the keys `id` and `date`. If not included, then they will take on default timestamp values.

To instantiate an attribute:
```
Attribute(key: string, value: string, searchable: Bool): Attribute
```
where `searchable` is optional and defaults to `false`.

## Changes
If this note model is insufficient in some way, please make a pull request and we'll see if your new changes work!
