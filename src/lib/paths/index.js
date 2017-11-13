import os from "os";
import path from "path";

// ~/.aurora
export function auroraRootPath() {
  return path.join(os.homedir(), ".aurora");
}

// ~/.aurora/<NODE_ENV>
export function auroraUserPath() {
  return path.join(auroraRootPath(), process.env.NODE_ENV);
}

// ~/.aurora/<NODE_ENV>/mutations
export function auroraMutationPath() {
  return path.join(auroraUserPath(), "mutations");
}

// ~/.aurora/<NODE_ENV>/mutations/node_modules
export function auroraMutationCachePath() {
  return path.join(auroraMutationPath(), "node_modules");
}

// ~/.aurora/<NODE_ENV>/mutations/package.json
export function auroraMutationPackageJSONPath() {
  return path.join(auroraMutationPath(), "package.json");
}

// ~/.aurora/<NODE_ENV>/mutations/node_modules/<name>
export function auroraMutationFilesPath(name) {
  return path.join(auroraMutationCachePath(), name);
}
