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

const DragHeaderContainer = styled.div`
  height: 100%;
`

/**
 * A componenent wrapper that attaches on a draggable header to the 
 * top of the screen.
 */
const Draggable = ({ children, dragRegionSize }) => {
  return (
    <DragHeaderContainer>
      <DragHeader
        className="drag-header"
        dragRegionSize={dragRegionSize}
        key="dragHeader"
      />
      {children}
    </DragHeaderContainer>
  );
};

Draggable.propTypes = {
  dragRegionSize: PropTypes.string,
  children: PropTypes.element.isRequired
};

module.exports = Draggable;
