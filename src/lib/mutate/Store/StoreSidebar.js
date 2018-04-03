import { Sidebar } from "../../ui/Sidebars";

const PaddedSidebar = Sidebar.extend`
  padding: ${props => props.theme.spacing.padding};
  padding-top: ${props => props.theme.spacing.lessPadding};
`;

export default PaddedSidebar;
