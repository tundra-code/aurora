import React from "react";
import ReactDOM from "react-dom";
import Demo from "./src/Demo.js";
import styled, { injectGlobal } from "styled-components";

/**
 * Fix some of the demo on here.
 */
/* eslint-disable no-unused-expressions */
injectGlobal`
    body {
        margin: 10px;
        margin-top: 50px;
        content-sizing: border-box;
    }

body, html, #web-root {
    background: white;
}

.background {
    border: 1px solid #eee;
}

.flex-seperated .note-wrapper {
    height: 100%;
    overflow: scroll;
}

.flex-seperated div {
    position: relative;
}
`;

const Main = styled.div`
  max-width: 600px;
  margin: auto;
  font-family: "Helvetica Neue";
  color: #282828;
`;

const H2 = styled.h2`font-weight: 100;`;

const App = () => {
  return (
    <Main>
      <h1> Aurora </h1>
      <hr />

      <H2> Overview </H2>
      <p>Aurora is a little note taking app. We think it{"'"}s pretty swell.</p>

      <H2> Demo </H2>
      <p>
        Here{"'"}s a tiny example of how Aurora works. (Press shift+enter to add
        a note.)
      </p>

      <Demo />

      <p>
        Made with
        <span role="img" aria-label="love">
          {" "}
          ❤️{" "}
        </span>
        by Scott, Kyle, Ethan, and Evan
      </p>
    </Main>
  );
};

ReactDOM.render(<App />, document.getElementById("web-root"));
