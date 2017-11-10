import { contentFromText } from "../../test-util";
import { serializeContent, deSerializeContent } from "../index.js";

describe("EditorSerializer", () => {
  it("can serialize then deSerializeContent correctly", () => {
    const content = contentFromText("Hello");
    const serializedContent = serializeContent(content);
    expect(serializedContent).toBeDefined();
    const content2 = deSerializeContent(serializedContent);
    expect(content2).toBeDefined();
  });
});
