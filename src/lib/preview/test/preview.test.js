import { getPreview } from "../index.js";
import { newNote } from "../../test-util/note-util.js";

describe("Preview", () => {
  it("is exported and exists", () => {
    expect(getPreview).toBeDefined();
  });

  it("returns a react component", () => {
    const preview = getPreview(newNote("hello"));
    expect(preview).toBeDefined();
  });
});
