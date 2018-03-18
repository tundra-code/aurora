import styled from "styled-components";
import { base } from "../theme";

const Card = styled.div`
  background: ${props => props.theme.colors.secondaryBackground};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius};
  width: ${props => (props.expanded ? "100%" : "initial")};
  padding: ${props => props.theme.spacing.extraPadding};
  margin-bottom: ${props => props.theme.spacing.extraPadding};
  box-sizing: border-box;
  overflow: hidden;
  border-top: 4px solid ${props => props.theme.colors.border};
  
  border-color: ${props =>
    props.active ? props.theme.colors.primary : props.theme.colors.border};
  
  `;

// Use the base theme by default
Card.defaultProps = {
  theme: base
};

export default Card;
