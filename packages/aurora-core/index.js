import React from "react";
import Feed from "../aurora-feed";
import { Background } from "../aurora-ui";
import io from "../aurora-persist/io";

/**
 * The main app.
 */
function Core() {
  return (
    <Background className="background">
      <Feed className="feed" persist={io} />
    </Background>
  );
}

export default Core;
