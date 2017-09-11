import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

/**
 * Allow the user to drag 
 */
const DragHeader = styled.div`
  -webkit-app-region: drag;
  width: 100%;
  top: 0;
  position: fixed;
  height: ${props => props.dragRegionSize};
  background: transparent;
`;

/**
 * Push the header down a bit so the content is not fully 
 * overlapping with the draggable region.
 */
const PushedDown = styled.div`
  padding-top: ${props =>
    props.dragRegionSize ? props.dragRegionSize : "50px"};
  height: 100%;
`;

/**
 * A componenent wrapper that attaches on a draggable header to the 
 * top of the screen.
 */
const Draggable = ({ children, dragRegionSize }) => {
  return (
    <PushedDown dragRegionSize={dragRegionSize} key="main">
      <DragHeader dragRegionSize={dragRegionSize} key="dragHeader" />
      {children}
    </PushedDown>
  );
};

Draggable.propTypes = {
  dragRegionSize: PropTypes.string,
  children: PropTypes.element.isRequired
};

module.exports = Draggable;
