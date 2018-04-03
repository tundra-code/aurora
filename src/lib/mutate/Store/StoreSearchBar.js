import React from "react";
import PropTypes from "prop-types";
import { Input } from "../../ui/Inputs";

const TopSearchBarInput = Input.extend`
  margin-bottom: ${props => props.theme.spacing.padding};
  margin-top: ${props => props.theme.spacing.padding};
  width: 100%;
`;

const StoreSearchBar = ({ onChange, value }) => {
  return (
    <TopSearchBarInput
      type="text"
      onChange={onChange}
      value={value}
      placeholder="Type to search for a extension..."
    />
  );
};

StoreSearchBar.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string
};

export default StoreSearchBar;
