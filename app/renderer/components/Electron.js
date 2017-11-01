import React from "react";
import Draggable from "./Draggable.js";
import PropTypes from "prop-types";

const Electron = ({ children }) => {
  return <Draggable dragRegionSize={"25px"}>{children}</Draggable>;
};

Electron.propTypes = {
  children: PropTypes.any
};

export default Electron;
