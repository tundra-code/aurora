import React from "react";
import { Card } from "../../ui";
import { PrimaryButton } from "../../ui/Buttons";
import styled from "styled-components";
import PropTypes from "prop-types";

const Title = styled.h2`
  margin-top: 0;
  font-weight: 300;
`;

const StoreItem = ({ title, description }) => (
  <Card>
    <Title>{title}</Title>
    <p>{description}</p>
    <PrimaryButton>Install</PrimaryButton>
  </Card>
);

StoreItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default StoreItem;
