import {
  auroraMutationPackageJSONPath,
  auroraMutationFilesPath
} from "../paths";
let requireMutations = () => new Promise((resolve, reject) => {});

const getPkg = () => {
  try {
    return window.require(auroraMutationPackageJSONPath());
  } catch (error) {
    return { dependencies: {} };
  }
};

if (process.env.NODE_ENV !== "test") {
  requireMutations = () => {
    try {
      const pkg = getPkg();
      const modules = Object.keys(pkg.dependencies).map(
        mut => window.require(auroraMutationFilesPath(mut)) // window.require is electron's built in require, not webpacks
      );
      return modules;
    } catch (error) {
      console.error(error); // eslint-disable-line no-console
      return [];
    }
  };
}

export default requireMutations;
