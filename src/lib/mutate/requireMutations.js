import defaultMutations from "./defaultMutations";
import path from "path";
import os from "os";
let requireMutations = () => new Promise();

if (process.env.NODE_ENV !== "test") {
  const mutationsPath = path.join(
    os.homedir(),
    "aurora-extensions/mutations/node_modules"
  );

  requireMutations = () => {
    const modules = defaultMutations.map(
      mut => window.require(`${mutationsPath}/${mut}`) // window.require is electron's built in require, not webpacks
    );
    return modules;
  };
}

export default requireMutations;
