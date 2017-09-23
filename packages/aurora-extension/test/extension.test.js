import React from "react";
import extendable from "../index.js";
import Feed from "../../aurora-feed";
import { Card } from "../../aurora-ui";
import { shallow } from "enzyme";

test("replace me because I will fail", () => {
  const Foo = extendable(Feed);
  shallow(<Foo />);
});
