import { Sidebar } from "../../ui/Sidebars";

const PaddedSidebar = Sidebar.extend`
  padding: ${props => props.theme.spacing.padding};
  padding-top: 25px;
`;

export default PaddedSidebar;
