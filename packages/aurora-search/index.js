import Fuse from "fuse.js";

/**
 * Returns a list of uuid's that match the text
 * @param {Array} items 
 * @param {String} query 
 */
function search(items, query) {
  const fuse = new Fuse(items, { keys: ["text"] });
  const foundUUIDs = fuse.search(query).map(data => data.uuid); // Get all uuids that match our search
  return foundUUIDs;
}

export default search;
