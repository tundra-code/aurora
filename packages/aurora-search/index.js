import Fuse from "fuse.js";

function search(items, query) {
  const fuse = new Fuse(items, { keys: ["text"] });
  return fuse.search(query);
}

export default search;
