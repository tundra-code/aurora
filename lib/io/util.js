import jetpack from "fs-jetpack";
const os = require("os");

function getAuroraDirContext() {
  return jetpack
    .dir(os.homedir())
    .dir(".aurora")
    .dir(process.env.NODE_ENV);
}

function saveTo(data, fileName, dirContext) {
  return dirContext.write(fileName, data);
}

function readFrom(fileName, dirContext) {
  return dirContext.read(fileName);
}

function deleteFile(fileName, dirContext) {
  return dirContext.remove(fileName);
}

export { getAuroraDirContext, saveTo, readFrom, deleteFile };
