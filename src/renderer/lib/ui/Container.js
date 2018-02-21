import Background from "./Background";

const PaddedBackground = Background.extend`
  padding: ${props => props.theme.spacing.padding};
  padding-top: 25px;
  box-sizing: border-box;
`;

export default PaddedBackground;
