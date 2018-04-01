import React from "react";
import styled from "styled-components";
import ReactTooltip from "react-tooltip";

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
  cursor: pointer;

  & span {
    position: relative;
    top: 5px;
  }

  &:hover {
    background-color: ${props => props.theme.colors.border};
  }
  &:active {
    background-color: ${props => props.theme.colors.primary};
  }
`;

const StyledTooltip = styled(ReactTooltip)`
  background-color: ${props => props.theme.colors.primary};
`;

class Toolbar extends React.Component {
  getSingleButtons = () => {
    return window.toolbar.buttons.map(button => {
      const boundItemClick = this.props.onClick.bind(this, button.command);
      return (
        <ToolbarItem
          onMouseDown={boundItemClick}
          onMouseUp={this.props.onClickRelease}
          key={button.command}
          data-tip={button.hint}>
          <span>{button.icon}</span>
          <StyledTooltip delayShow={1000} />
        </ToolbarItem>
      );
    });
  };
  render() {
    return (
      <ToolbarContainer id="toolbar-container">
        {this.getSingleButtons()}
      </ToolbarContainer>
    );
  }
}

export default Toolbar;
