import React from "react";
import { mutate } from "@react-mutate/core";
import { connect } from "react-redux";
import { setQuery } from "../../redux/actions";
import { Menu } from "../ui/Menu";
import NoteList from "./NoteList.js";
import { Input } from "../ui/Inputs";

const BumpedDownMenu = Menu.extend` 
  /* padding-top: ${props => props.theme.spacing.header}; */
`;

const SearchBar = Input.extend`
  margin-top: 8px;
  margin-bottom: 16px;
`;

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  onInput = e => {
    const searchBoxValue = e.target.value;
    this.props.dispatch(setQuery(searchBoxValue));
  };

  render() {
    return (
      <div>
        <BumpedDownMenu>
          <SearchBar onInput={this.onInput} placeholder="Search" />
          <NoteList />
        </BumpedDownMenu>
      </div>
    );
  }
}

Sidebar.propTypes = {};

export default connect()(mutate(Sidebar, "Sidebar"));
