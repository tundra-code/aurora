import React from "react";
import Feed from "../aurora-feed";
import { Background } from "../aurora-ui";

/**
 * The main app.
 */
function Core() {
  return (
    <Background className="background">
      <Feed className="feed" />
    </Background>
  );
}

export default Core;
