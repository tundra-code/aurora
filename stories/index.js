import React from "react";

import { storiesOf } from "@storybook/react";
import { linkTo } from "@storybook/addon-links";
import { Welcome } from "@storybook/react/demo";
import { Card, Background } from "../packages/aurora-ui";
import styled from "styled-components";
import { canSubmit } from "./editors.js";
import feed from "./feed.js";

const Expanded = styled.div`
  width: 100%;
  height: 500px;
  padding-top: 20px;
`;

storiesOf("Example", module).add("to Storybook", () => (
  <Welcome showApp={linkTo("Button")} />
));

storiesOf("Card", module).add("with rich text", () => (
  <Background>
    <Expanded>
      <Card>
        <h3> Hello, yes, I am a card. </h3>

        <p> Card is white and Background is gray. </p>

        <h4> Anything can be in card. Including Doggo. </h4>

        <img
          src="https://media.giphy.com/media/Z3aQVJ78mmLyo/giphy.gif"
          height="150px"
        />
      </Card>
    </Expanded>
  </Background>
));

storiesOf("Editor", module).add("canSubmit", canSubmit);

storiesOf("Feed", module).add("default", feed);
