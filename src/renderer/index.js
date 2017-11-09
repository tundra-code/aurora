import React from "react";
import ReactDOM from "react-dom";
import Core from "../lib/core";

document.body.innerHTML = `<div id="root"></div>`;

ReactDOM.render(<Core />, document.getElementById("root"));
