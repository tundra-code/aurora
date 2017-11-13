import {
  auroraMutationPackageJSONPath,
  auroraMutationFilesPath
} from "../paths";

let requireMutations = () => new Promise();

if (process.env.NODE_ENV !== "test") {
  requireMutations = () => {
    try {
      const pkg = window.require(auroraMutationPackageJSONPath());
      const modules = Object.keys(pkg.dependencies).map(
        mut => window.require(auroraMutationFilesPath(mut)) // window.require is electron's built in require, not webpacks
      );
      return modules;
    } catch (error) {
      // TODO log error
      return [];
    }
  };
}

export default requireMutations;
