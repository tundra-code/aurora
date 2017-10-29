import React from "react";
import { Card } from "../../ui";
import { PrimaryButton } from "../../ui/Buttons";
import { withShadow } from "../../ui/Modifiers";
import styled from "styled-components";
import PropTypes from "prop-types";

const Title = styled.h2`
  margin-top: 0;
  font-weight: 300;
`;

const CardWithShadow = withShadow(Card);

const StoreItem = ({ title, description, onClick }) => (
  <CardWithShadow>
    <Title>{title}</Title>
    {description && <p>{description}</p>}
    <PrimaryButton onClick={onClick}>Install</PrimaryButton>
  </CardWithShadow>
);

StoreItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  onClick: PropTypes.func.isRequired
};

export default StoreItem;
