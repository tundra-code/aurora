import React from "react";
import { Card } from "../../ui";
import { PrimaryButton } from "../../ui/Buttons";
import { withShadow } from "../../ui/Modifiers";
import styled from "styled-components";
import PropTypes from "prop-types";
import {
  INSTALLING,
  INSTALLED,
  ERROR,
  UNINSTALL,
  UNINSTALLING
} from "./InstallStates";

const Title = styled.h2`
  margin-top: 0;
  font-weight: 300;
`;

const CardWithShadow = withShadow(Card);

const InstallButton = ({ installState, onClick, onUninstallClick }) => {
  switch (installState) {
    case INSTALLING:
      return <p> Installing... This may take a moment 😅 </p>;
    case INSTALLED:
      return (
        <p>
          🙌 Installed! You may need to restart the app in order to see the
          effects.
        </p>
      );
    case UNINSTALL:
      return (
        <PrimaryButton onClick={onUninstallClick}>Uninstall</PrimaryButton>
      );
    case ERROR:
      return <p> Error! </p>;
    default:
      return <PrimaryButton onClick={onClick}>Install</PrimaryButton>;
  }
};

const StoreItem = ({
  title,
  description,
  onClick,
  installState,
  onUninstallClick
}) => (
  <CardWithShadow>
    <Title>{title}</Title>
    {description && <p>{description}</p>}

    <InstallButton
      installState={installState}
      onClick={onClick}
      onUninstallClick={onUninstallClick}
    />
  </CardWithShadow>
);

StoreItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  onClick: PropTypes.func.isRequired
};

export default StoreItem;
