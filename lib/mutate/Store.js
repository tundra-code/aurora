import React from "react";
import { Themed } from "../theme";
import { Background, Sidebars } from "../ui";
import styled from "styled-components";

const { Sidebar, SidebarContainer } = Sidebars;

const SecondaryBackground = styled.div`
  background: ${props => props.theme.colors.secondaryBackground};

  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 100%;
`;

const AbsoluteSideBarContainer = SidebarContainer.extend`
  position: absolute;
`;

const PaddedSidebar = Sidebar.extend`
  padding: ${props => props.theme.spacing.padding};
  padding-top: 25px;
`;

const PaddedBackground = Background.extend`
  padding: ${props => props.theme.spacing.padding};
  padding-top: 25px;
`;

class Store extends React.Component {
  render() {
    return (
      <Themed>
        <SecondaryBackground>
          <AbsoluteSideBarContainer>
            <PaddedSidebar>
              <p>Hello yes hello</p>
            </PaddedSidebar>
            <PaddedBackground>
              <p>Hello Yes Store</p>
            </PaddedBackground>
          </AbsoluteSideBarContainer>
        </SecondaryBackground>
      </Themed>
    );
  }
}

export default Store;
