import { renderPreview } from "../index.js";
import { newNote } from "../../test-util/note-util.js";

describe("Preview", () => {
  it("is exported and exists", () => {
    expect(renderPreview).toBeDefined();
  });

  it("returns a react component", () => {
    const note = newNote("hello");
    const preview = renderPreview(note);
    expect(preview).toBeDefined();
  });
});
