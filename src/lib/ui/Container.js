import Background from "./Background";

const PaddedBackground = Background.extend`
  padding: ${props => props.theme.spacing.padding};
  padding-top: ${props => props.theme.spacing.lessPadding};
  box-sizing: border-box;
`;

export default PaddedBackground;
