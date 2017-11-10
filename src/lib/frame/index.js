import { Card, Container } from "../ui";
import React from "react";
import { mutate } from "@react-mutate/core";
import { Editor } from "../editor";
import PropTypes from "prop-types";

const Frame = props => (
  <Container>
    <Card>
      <Editor placeholder={"Change me!"} />
    </Card>
    {props.children}
  </Container>
);

Frame.propTypes = {
  children: PropTypes.any
};

export default mutate(Frame, "Frame");
