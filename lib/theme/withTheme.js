import Themed from "./Themed";
import React from "react";

const withTheme = Component => {
  return props => {
    return (
      <Themed>
        <Component {...props} />
      </Themed>
    );
  };
};

export default withTheme;
