import React from "react";
import Feed from "../../aurora-feed";
import { Background } from "../../aurora-ui";
import { Themed } from "../../aurora-theme";
import fake from "../../aurora-persist/fake";

const MyBackground = Background.extend`height: 300px;`;

const Demo = () => {
  return (
    <Themed>
      <MyBackground className="background">
        <Feed persist={fake} />
      </MyBackground>
    </Themed>
  );
};

export default Demo;
