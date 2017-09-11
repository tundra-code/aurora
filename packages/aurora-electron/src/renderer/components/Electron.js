import React from "react";
import Core from "../../../../aurora-core/index.js";
import Draggable from "./Draggable.js";

export default () => {
  return (
    <Draggable dragRegionSize={"25px"}>
      <Core />
    </Draggable>
  );
};
