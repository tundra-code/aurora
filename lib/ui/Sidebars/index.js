import styled from "styled-components";

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
  width: 100%;
`;

const Sidebar = styled.div`
  background: ${props => props.theme.colors.secondaryBackground};
  width: 300px;
  border-right: 1px solid ${props => props.theme.colors.border};
`;

export { SidebarContainer, Sidebar };
