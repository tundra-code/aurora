import { Card, Container } from "../ui";
import React from "react";
import { mutate } from "@react-mutate/core";
import { Editor, modifiers } from "../editor";
import PropTypes from "prop-types";

const EditorThatCanType = modifiers.canType(Editor);

const Frame = () => (
  <Container>
    <Card>
      <EditorThatCanType onUpdate={() => {}} placeholder={"Change me!"} />
    </Card>
  </Container>
);

Frame.propTypes = {
  children: PropTypes.any
};

export default mutate(Frame, "Frame");
