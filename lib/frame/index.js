import { Background } from "../ui";
import React from "react";
import { mutate } from "@react-mutate/core";
import PropTypes from "prop-types";

const Frame = ({ children }) => (
  <Background className="background"> {children} </Background>
);

Frame.propTypes = {
  children: PropTypes.any
};

export default mutate(Frame, "Frame");
