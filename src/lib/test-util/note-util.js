import { NoteModel, Attribute, Tag } from "../note";
import { serializeContent, EDITOR_NAME } from "../editor";
import { contentFromText } from "./editor-util.js";

const newNote = (text, tags = []) => {
  const content = contentFromText(text);
  const tagObjects = tags.map(tag => {
    return new Tag(tag);
  });
  const attrs = [
    new Attribute("title", "My note", true),
    new Attribute("class", "math")
  ];
  return new NoteModel(
    serializeContent(content),
    EDITOR_NAME,
    tagObjects,
    attrs
  );
};

export { newNote };
