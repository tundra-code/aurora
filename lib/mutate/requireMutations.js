import { remote } from "electron";

let requireMutations = () => [];

// Don't run in test env
if (process.env.NODE_ENV !== "test") {
  const { mutationsPath, defaultMutations } = remote.require("./mutations");
  
  requireMutations = () => {
    const modules = defaultMutations.map(
      mut => window.require(`${mutationsPath}/${mut}`) // window.require is electron's built in require, not webpacks
    );
    return modules;
  };
}


export default requireMutations;
