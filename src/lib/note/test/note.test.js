import { NoteModel, Attribute, Tag } from "../index.js";
import { newNote, contentFromText } from "../../test-util";

describe("NoteModel", () => {
  it("is exported and exists", () => {
    expect(NoteModel).toBeDefined();
  });

  it("can add and delete an attribute", () => {
    const note = newNote("hello");
    const numAtts = note.attributes.length;
    note.addAttribute(new Attribute("lecture", "1"));
    expect(note.attributes.length).toBe(numAtts + 1);
    note.removeAttribute(note.attributes[0].id);
    expect(note.attributes.length).toBe(numAtts);
  });

  it("can add and delete a tag", () => {
    const note = newNote("hello");
    const numTags = note.tags.length;
    note.addTag(new Tag("git"));
    expect(note.tags.length).toBe(numTags + 1);
    note.removeTag(note.tags[0].id);
    expect(note.tags.length).toBe(numTags);
  });

  it("can set note content", async () => {
    const note = newNote("some text");
    const content1 = await note.getContent();
    note.setContent(contentFromText("some other text"));
    const content2 = await note.getContent();
    expect(content2).not.toBe(content1);
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
