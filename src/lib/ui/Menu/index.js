import styled from "styled-components";
import Card from "../Card";

export const MenuItem = styled.a`
  width: 100%;
  border-radius: ${props => props.theme.borderRadius};
  padding: ${props => props.theme.spacing.padding};
  cursor: pointer;

  color: ${props => (props.active ? props.theme.colors.primary : "initial")};
  background ${props =>
    props.active ? props.theme.colors.lightPrimary : "initial"};

  &:hover {
      color: ${props => props.theme.colors.primary};
  }
`;

export const Menu = styled.div`
  width: 100%;
  height: 100%;
  padding: ${props => props.theme.spacing.padding};
  display: flex;
  flex-direction: column;
`;

export const MenuCardList = styled.div`
  width: 100%;
  padding: ${props => props.theme.spacing.padding};
  padding-right: 0;
  padding-bottom: 0;
`;

export const MenuCard = Card.extend`
  cursor: pointer;
  margin-left: ${props => props.theme.spacing.padding};
  margin-bottom: ${props => props.theme.spacing.padding};
  padding: ${props => props.theme.spacing.padding};

  &:hover {
    border-color: ${props => props.theme.colors.primary};
  }

  border-color: ${props =>
    props.active ? props.theme.colors.primary : props.theme.colors.border};
`;
