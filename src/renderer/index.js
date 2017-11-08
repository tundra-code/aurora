import React from "react";
import ReactDOM from "react-dom";
import Core from "../lib/core";
import path from "path";

const resetCSS = path.join(__static, "/reset.css");

document.body.innerHTML = `<div id="root">
    <link rel="stylesheet" href="${resetCSS}"/>
</div>`;

ReactDOM.render(<Core />, document.getElementById("root"));
