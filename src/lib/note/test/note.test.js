import { NoteModel, Tag } from "../index.js";
import { newNote, contentFromText } from "../../test-util";

describe("NoteModel", () => {
  it("is exported and exists", () => {
    expect(NoteModel).toBeDefined();
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

describe("Tag", () => {
  it("is exported and exists", () => {
    expect(Tag).toBeDefined();
  });
});
