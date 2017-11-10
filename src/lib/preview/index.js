import Preview from "./Preview.js";
import React from "react";

function getPreview(note) {
  return <Preview note={note} />;
}

export { getPreview };
