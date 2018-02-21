import React from "react";
import StoreItem from "./StoreItem";
import { removePrefix } from "./util";
import PropTypes from "prop-types";

const StoreItemList = ({ items, onClick, onUninstallClick }) => {
  if (!items) {
    return <div />;
  }

  const ListMap = items.map(item => {
    const title = removePrefix(item.package.name);

    // Handle the case where something is named
    // 'aurora-mutate' without any suffix
    if (!title) {
      return null;
    }

    return (
      <StoreItem
        key={item.package.name}
        title={removePrefix(item.package.name)}
        description={item.package.description}
        onClick={() => {
          onClick(item.package);
        }}
        onUninstallClick={() => {
          onUninstallClick(item.package);
        }}
        installState={item.package.installState}
      />
    );
  });

  return <div>{Array.from(ListMap.values())}</div>;
};

StoreItemList.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default StoreItemList;
