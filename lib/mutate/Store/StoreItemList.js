import React from "react";
import StoreItem from "./StoreItem";
import { removePrefix } from "./util";
import PropTypes from "prop-types";

const StoreItemList = ({ items, onClick }) => {
  const List = items.map(item => {
    return (
      <StoreItem
        key={item.package.name}
        title={removePrefix(item.package.name)}
        description={item.package.description}
        onClick={() => {
          onClick(item.package);
        }}
      />
    );
  });

  return <div>{List}</div>;
};

StoreItemList.propTypes = {
  items: PropTypes.array,
  onClick: PropTypes.func.isRequired
};

export default StoreItemList;
