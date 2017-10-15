import React from "react";
import Core from "../../../lib/core/index.js";
import Draggable from "./Draggable.js";

export default () => {
  return (
    <Draggable dragRegionSize={"25px"}>
      <Core />
    </Draggable>
  );
};
