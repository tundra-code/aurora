import { NoteModel, Attribute, Tag } from "../index.js";
import { EditorState, ContentState } from "draft-js";
import { serializeContent } from "../../editor";

const newNote = () => {
  const content = EditorState.createWithContent(
    ContentState.createFromText("Some Text")
  );
  return new NoteModel(
    serializeContent(content),
    "Aurora-Editor",
    [new Tag("java"), new Tag("sql")],
    [new Attribute("title", "My note", true), new Attribute("class", "math")]
  );
};

describe("NoteModel", () => {
  it("is exported and exists", () => {
    expect(NoteModel).toBeDefined();
  });

  it("can add and delete an attribute", () => {
    const note = newNote();
    const numAtts = note.attributes.length;
    note.addAttribute(new Attribute("lecture", "1"));
    expect(note.attributes.length).toBe(numAtts + 1);
    note.removeAttribute(note.attributes[0].id);
    expect(note.attributes.length).toBe(numAtts);
  });

  it("can add and delete a tag", () => {
    const note = newNote();
    const numTags = note.tags.length;
    note.addTag(new Tag("git"));
    expect(note.tags.length).toBe(numTags + 1);
    note.removeTag(note.tags[0].id);
    expect(note.tags.length).toBe(numTags);
  });

  it("can set note content", done => {
    const note = newNote();
    note.getContent(content1 => {
      note.setContent(
        EditorState.createWithContent(
          ContentState.createFromText("Some other Text")
        )
      );
      note.getContent(content2 => {
        expect(content2).not.toBe(content1);
        done();
      });
    });
  });
});

describe("Attribute", () => {
  it("is exported and exists", () => {
    expect(Attribute).toBeDefined();
  });
});

describe("Tag", () => {
  it("is exported and exists", () => {
    expect(Tag).toBeDefined();
  });
});
