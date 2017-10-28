import React from "react";
import Draggable from "./Draggable.js";

export default ({children}) => {
  return (
    <Draggable dragRegionSize={"25px"}>
      {children}
    </Draggable>
  );
};
