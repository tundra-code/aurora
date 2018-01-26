import { contentFromText } from "../../test-util";
import { serializeContent, deSerializeContent } from "../index.js";
import { editorStateFromText } from "../util";
import { serializePreview } from "../Preview";

describe("EditorSerializer", () => {
  it("can serialize then deSerializeContent correctly", () => {
    const content = contentFromText("Hello");
    const serializedContent = serializeContent(content);
    expect(serializedContent).toBeDefined();
    const content2 = deSerializeContent(serializedContent);
    expect(content2).toBeDefined();
  });

  it("it can serialize a preview", () => {
    const state = editorStateFromText("yo");
    const serializedPreview = serializePreview(state);
    expect(serializedPreview).toBeDefined();
  });
});
