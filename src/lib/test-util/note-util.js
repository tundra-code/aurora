import { NoteModel, Attribute, Tag } from "../note";
import { serializeContent } from "../editor";
import { contentFromText } from "./editor-util.js";

const newNote = text => {
  const content = contentFromText(text);
  return new NoteModel(
    serializeContent(content),
    "Aurora-Editor",
    [new Tag("java"), new Tag("sql")],
    [new Attribute("title", "My note", true), new Attribute("class", "math")]
  );
};

export { newNote };
