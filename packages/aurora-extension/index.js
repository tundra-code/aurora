import React from "react";

const userExtensions = {
  Feed: require("./extensions/NotFeed.js").default
};

export default Component => {
  return class extends React.Component {
    constructor(props) {
      super(props);

      this.name = Component.displayName || Component.name;
      this.ToRender = userExtensions[this.name]
        ? userExtensions[this.name]
        : Component;
    }

    render() {
      const ToRender = this.ToRender;
      return <ToRender {...this.props} />;
    }
  };
};
