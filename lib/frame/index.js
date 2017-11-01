import { Background } from "../ui";
import React from "react";
import { mutate } from "@react-mutate/core";
import { Editor } from "../editor";
import { modifiers } from "../editor";

const EditorThatCanType = modifiers.canType(Editor);

const Frame = () => (
  <Background className="background">
    <EditorThatCanType onUpdate={() => {}} placeholder={"Change me!"} />
  </Background>
);

export default Frame;
