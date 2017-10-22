import { remote } from "electron";
const { mutationsPath, defaultMutations } = remote.require("./mutations");

const requireMutations = () => {
  const modules = defaultMutations.map(
    mut => window.require(`${mutationsPath}/${mut}`) // window.require is electron's built in require, not webpacks
  );
  return modules;
};

export default requireMutations;
