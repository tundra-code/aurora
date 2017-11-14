import styled from "styled-components";

const Button = styled.button`
  border: 0;
  border-radius: ${props => props.theme.borderRadius};
  display: inline-block;
  text-transform: capitalize;
  line-height: 16px;
  font-size: 14px;
  font-weight: 400;
  text-decoration: none;
  text-align: center;
  white-space: nowrap;
  box-sizing: border-box;
  cursor: pointer;
  padding: 10px 20px;
  transition: 0.2s;
  transition-property: background-color, color, box-shadow, opacity,
    -webkit-box-shadow;

  &:hover,
  &:focus,
  &:active {
    outline: 0;
  }
`;

const PrimaryButton = Button.extend`
  background: ${props => props.theme.colors.darkPrimary};
  color: white;

  &:hover,
  &:focus,
  &:active {
    background: ${props => props.theme.colors.primary};
  }
`;

const SuccessButton = Button.extend`
  background: ${props => props.theme.colors.darkSuccess};
  color: white;

  &:hover,
  &:focus,
  &:active {
    background: ${props => props.theme.colors.success};
  }
`;

const DangerButton = Button.extend`
  background: ${props => props.theme.colors.darkDanger};
  color: white;

  &:hover,
  &:focus,
  &:active {
    background: ${props => props.theme.colors.danger};
  }
`;

export { Button, PrimaryButton, SuccessButton, DangerButton };
