import Fuse from "fuse.js";

/**
 * Returns a list of id's that match the text
 * @param {Array} items 
 * @param {String} query 
 */
function search(items, query) {
  const fuse = new Fuse(items, { keys: ["text"] });
  const foundids = fuse.search(query).map(data => data.id); // Get all ids that match our search
  return foundids;
}

export default search;
