import React from "react";
import { mutate } from "@react-mutate/core";
import PropTypes from "prop-types";
import SplitPane from "react-split-pane";
import StyledSplitPaneContainer from "../ui/SplitPanes";
import { FixedWidthDiv } from "../ui/util/Layouts";
import Sidebar from "../sidebar";
import Feed from "../feed";
import { connect } from "react-redux";

const LeftFixedWidthDiv = FixedWidthDiv.extend`
  background: ${props => props.theme.colors.secondaryBackground};
  height: 100%;
`;

const Frame = props => (
  <StyledSplitPaneContainer>
    <SplitPane split="vertical" minSize={200} maxSize={400} defaultSize={250}>
      <LeftFixedWidthDiv>
        <Sidebar />
      </LeftFixedWidthDiv>
      <FixedWidthDiv>
        <Feed />
        {props.children}
      </FixedWidthDiv>
    </SplitPane>
  </StyledSplitPaneContainer>
);

Frame.propTypes = {
  children: PropTypes.any
};

export default connect()(mutate(Frame, "Frame"));
