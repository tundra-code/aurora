import React from "react";
import Feed from "../packages/aurora-feed";
import { Background } from "../packages/aurora-ui";
import { Themed } from "../packages/aurora-theme";

const feed = () => {
  return (
    <Themed>
      <Background className="background">
        <Feed />
      </Background>
    </Themed>
  );
};

export default feed;
