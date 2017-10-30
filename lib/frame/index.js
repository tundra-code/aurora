import { Background } from "../ui";
import React from "react";
import { mutate } from "@react-mutate/core";

const Frame = ({ children }) => (
  <Background className="background"> {children} </Background>
);

export default mutate(Frame, "Frame");
