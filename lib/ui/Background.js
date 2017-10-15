import styled from "styled-components";
import { base } from "../theme";

const Background = styled.div`
  background: ${props => props.theme.colors.background};
  width: 100%;
  height: 100%;
`;

// Use the base theme by default
Background.defaultProps = {
  theme: base
};

export default Background;
