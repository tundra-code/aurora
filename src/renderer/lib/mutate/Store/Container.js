import React from "react";
import { Themed } from "../../theme";
import { SidebarContainer } from "../../ui/Sidebars";
import styled from "styled-components";
import PropTypes from "prop-types";

const SecondaryBackground = styled.div`
  background: ${props => props.theme.colors.secondaryBackground};

  position: absolute;
  top: 25px;
  left: 0;
  min-width: 100%;
  min-height: 100%;
`;

const AbsoluteSideBarContainer = SidebarContainer.extend`
  position: absolute;
`;

const Container = ({ children }) => (
  <Themed>
    <SecondaryBackground>
      <AbsoluteSideBarContainer>{children}</AbsoluteSideBarContainer>
    </SecondaryBackground>
  </Themed>
);

Container.propTypes = {
  children: PropTypes.any.isRequired
};

export default Container;
