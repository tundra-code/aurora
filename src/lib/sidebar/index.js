import React from "react";
import { mutate } from "@react-mutate/core";
import NoteList from "./NoteList.js";

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1> Your Notes: </h1>
        <NoteList />
      </div>
    );
  }
}

Sidebar.propTypes = {};

export default mutate(Sidebar, "Sidebar");
