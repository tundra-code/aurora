import { Background } from "../ui";
import React from "react";
import { mutate } from "@react-mutate/core";
import { Editor } from "../editor";

const Frame = () => {
  <Background className="background">
    <Editor />
  </Background>;
};

export default mutate(Frame, "Frame");
