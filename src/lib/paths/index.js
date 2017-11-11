import os from "os";
import path from "path";

// ~/.aurora
export function auroraRootPath() {
  return path.join(os.homedir(), ".aurora");
}

// ~/.aurora/mutations
export function auroraMutationPath() {
  return path.join(auroraRootPath(), "mutations");
}

// ~/.aurora/mutations/node_modules
export function auroraMutationCachePath() {
  return path.join(auroraMutationPath(), "node_modules");
}

// ~/.aurora/mutations/package.json
export function auroraMutationPackageJSONPath() {
  return path.join(auroraMutationPath(), "package.json");
}

// ~/.aurora/mutations/node_modules/<name>
export function auroraMutationFilesPath(name) {
  return path.join(auroraMutationCachePath(), name);
}
