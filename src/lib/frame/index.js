import { Card, Container } from "../ui";
import React from "react";
import { mutate } from "@react-mutate/core";
import { Editor } from "../editor";
import PropTypes from "prop-types";
import SplitPane from "react-split-pane";
import StyledSplitPaneContainer from "../ui/SplitPanes"
import {FixedWidthDiv} from "../ui/util/Layouts"

const Frame = props => (
  <StyledSplitPaneContainer>
    <SplitPane split="vertical" minSize={200} maxSize={400} defaultSize={250}>

      <FixedWidthDiv>
      </FixedWidthDiv>

      <FixedWidthDiv>
        <Container>
          <Card>
            <Editor placeholder={"Change me!"} />
          </Card>
          {props.children}
        </Container>
      </FixedWidthDiv>

    </SplitPane>
  </StyledSplitPaneContainer>
);

Frame.propTypes = {
  children: PropTypes.any
};

export default mutate(Frame, "Frame");
