import styled from "styled-components";

const Input = styled.input`
  border-radius: 5px;
  padding: 0px 16px 0px 16px;
  height: 40px;
  background-color: ${props => props.theme.colors.secondaryBackground};
  color: ${props => props.theme.colors.text};
  border-width: 1px;
  line-height: 24px;
  border-style: solid;
  border-color: ${props => props.theme.colors.border};
  border-image: initial;
  font-size: ${props => props.theme.fontSize};
  box-sizing: border-box;

  &:focus {
      outline: none !important;
      border-color: ${props => props.theme.colors.primary};
  }
`;

export { Input };
