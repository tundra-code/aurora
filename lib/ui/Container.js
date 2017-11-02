import Background from "./Background";

const PaddedBackground = Background.extend`
  padding: ${props => props.theme.spacing.extraPadding};
  padding-top: 25px;
  box-sizing: border-box;
`;

export default PaddedBackground;
