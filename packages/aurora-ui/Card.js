import styled from "styled-components";
import { base } from "../aurora-theme";

const Card = styled.div`
  background: ${props => props.theme.colors.secondaryBackground};
  border-bottom: 1px solid ${props => props.theme.colors.border};
  width: ${props => (props.expanded ? "100%" : "initial")};
  padding: ${props => props.theme.spacing.padding};
  margin-bottom: ${props => props.theme.spacing.padding};
`;

// Use the base theme by default
Card.defaultProps = {
  theme: base
};

export default Card;
