import React from "react";
import { withMutations } from "../mutate";
import Frame from "../frame";
import { Themed } from "../theme";

const Core = () => (
  <Themed>
    <Frame />
  </Themed>
);

export default withMutations(Core);
