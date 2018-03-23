import React from "react";
import styled from "styled-components";

const ToolbarContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const ToolbarItem = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 15px;
  user-select: none;
  text-align: center;
  &:hover {
    background-color: ${props => props.theme.colors.border};
  }
  &:active {
    background-color: ${props => props.theme.colors.primary};
  }
`;

class Toolbar extends React.Component {
  render() {
    return (
      <ToolbarContainer>
        <ToolbarItem>💾</ToolbarItem>
        <ToolbarItem>💰</ToolbarItem>
        <ToolbarItem>💰</ToolbarItem>
        <ToolbarItem>💰</ToolbarItem>
        <ToolbarItem>💰</ToolbarItem>
        <ToolbarItem>💰</ToolbarItem>
      </ToolbarContainer>
    );
  }
}

export default Toolbar;
