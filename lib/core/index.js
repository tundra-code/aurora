import React from "react";
import { Background } from "../ui";
import { withMutations } from "../mutate";

const Core = () => <Background className="background" />;

export default withMutations(Core);
