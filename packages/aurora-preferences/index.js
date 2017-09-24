import { util } from "../aurora-file-io";
import { PREFERENCES_FILE_NAME } from "./constants.js";

const createPrefsFileIfNotExist = auroraContext => {
  return auroraContext.file(PREFERENCES_FILE_NAME, { content: "{}" }).cwd();
};

/**
 * Reads the existing preferences. You optionally specify
 * @param {jetpack} auroraContext
 */
function read(auroraContext) {
  auroraContext = auroraContext || util.getAuroraDirContext();
  createPrefsFileIfNotExist(auroraContext);
  return auroraContext
    .readAsync(PREFERENCES_FILE_NAME)
    .then(data => JSON.parse(data));
}

/**
 * Update preferences by applying a subset of the preferences you want onto
 * the existing preference json file.
 * 
 * @example 
 * prefs.write({
 *   extensions: ["doggos", "best-doggos", "like-could-you-have-better-doggos"]
 * })
 * 
 * @param {object}  prefs       The subset you want to pass in 
 * @param {jetpack} auroraPath  An optional "auroraPath" you can specifiy. Otherwise 
 *                              it will just use the default
 */
async function write(prefs, auroraContext) {
  auroraContext = auroraContext || util.getAuroraDirContext();
  createPrefsFileIfNotExist(auroraContext);
  const oldJson = await read(auroraContext);

  const newJson = Object.apply({}, oldJson, prefs);
  return auroraContext.writeAsync(PREFERENCES_FILE_NAME, newJson);
}

export default { write, read };
