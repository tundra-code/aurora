import prefs from "../index.js";
import { PREFERENCES_FILE_NAME } from "../constants.js";
import _ from "lodash";
import jetpack from "fs-jetpack";
import tmp from "tmp";

const getTmpDirContext = () => {
  const tmpDirObj = tmp.dirSync({ prefix: "prefs-" });
  const context = jetpack.dir(tmpDirObj.name);
  return context;
};

describe("read", () => {
  it("is defined", () => {
    expect(prefs.read).toBeDefined();
  });

  it("will return an empty object if we have no prefs file", async () => {
    const json = await prefs.read();
    expect(json).toBeDefined();
    expect(_.isEmpty(json)).toBe(true);
  });

  it("can read some json in the preferences file", async () => {
    const dirContext = getTmpDirContext();
    dirContext.file(PREFERENCES_FILE_NAME, {
      content: {
        foo: "bar"
      }
    });

    const json = await prefs.read(dirContext);
    expect(json).toBeDefined();
    expect(json.foo).toBe("bar");
  });
});
