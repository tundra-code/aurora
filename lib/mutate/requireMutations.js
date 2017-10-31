import { remote } from "electron";
const muts = remote.require("./mutations");

const requireMutations = () => {
  // Don't load if our remote.require fails
  if (!muts) {
    return [];
  }
  const { defaultMutations, mutationsPath } = muts;

  const modules = defaultMutations.map(
    mut => window.require(`${mutationsPath}/${mut}`) // window.require is electron's built in require, not webpacks
  );
  return modules;
};

export default requireMutations;
