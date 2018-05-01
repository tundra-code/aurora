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
  UNINSTALLED
} from "./InstallStates";

const app = require("electron").remote.app;

const Title = styled.h2`
  margin-top: 0;
  font-weight: 300;
`;

const CardWithShadow = withShadow(Card);

const reload = () => {
  app.relaunch();
  app.exit(0);
};

const InstallButton = ({ installState, onClick, onUninstallClick }) => {
  switch (installState) {
    case INSTALLING:
      return <p> Installing... This may take a moment 😅 </p>;
    case INSTALLED:
      return (
        <div>
          <p>
            🙌 Installed! You need to reload the app in order to see the
            effects.
          </p>
          <PrimaryButton onClick={reload}>Reload</PrimaryButton>
        </div>
      );
    case UNINSTALL:
      return (
        <PrimaryButton onClick={onUninstallClick}>Uninstall</PrimaryButton>
      );
    case UNINSTALLED:
      return (
        <div>
          <p>
            ✔️ Uninstalled. You need to reload the app in order to see the
            effects.
          </p>
          <PrimaryButton onClick={reload}>Reload</PrimaryButton>
        </div>
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
