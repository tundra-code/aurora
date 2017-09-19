import React from "react";
import Feed from "../packages/aurora-feed";
import { Background } from "../packages/aurora-ui";
import { Themed } from "../packages/aurora-theme";
import fake from "../packages/aurora-persist/fake";

const feed = () => {
  return (
    <Themed>
      <Background className="background">
        <Feed persist={fake} />
      </Background>
    </Themed>
  );
};

export default feed;
