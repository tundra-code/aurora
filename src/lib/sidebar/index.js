import React from "react";
import styled from "styled-components";
import { mutate } from "@react-mutate/core";
import { connect } from "react-redux";
import { query } from "../../redux/selectors";
import { setQuery } from "../../redux/actions";
import { Menu } from "../ui/Menu";
import NoteList from "./NoteList.js";
import { Input } from "../ui/Inputs";
import TagList from "./TagList.js"

<<<<<<< HEAD
const BumpedDownMenu = Menu.extend`
  padding-top: ${props => props.theme.spacing.header};
  flex: 1;
=======
const BumpedDownMenu = Menu.extend` 
  /* padding-top: ${props => props.theme.spacing.header}; */
>>>>>>> 58168d3088e5db273806b76c87113889579533d3
`;

const SearchBar = Input.extend`
  margin-top: 8px;
  margin-bottom: 16px;
`;

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ToastBar = styled.div`
  display: flex;
  width: 100%;
`;

const ToastButton = styled.button`
  margin: 10px;
  padding: 10px;
  flex: 1;
  background-color: rgba(1,1,1,0);
  border: none;
  
`

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noteView: "Recent"
    };
  }

  onInput = e => {
    const searchBoxValue = e.target.value;
    this.props.dispatch(setQuery(searchBoxValue));
  };

  onViewSelect = type => {
    return () => {
      this.setState({noteView: type}, () => {
        this.props.dispatch(setQuery(""));
      });
    }
  }

  chooseNoteView = () => {
    if(this.state.noteView === "Recent" || this.props.query.length !== 0){
      return <NoteList />
    }
    
    return <TagList/>
  }

  render() {
    return (
      <SidebarContainer>
        <BumpedDownMenu>
            <SearchBar onInput={this.onInput} value={this.props.query} placeholder="Search" />
            {this.chooseNoteView()}
        </BumpedDownMenu>
        <ToastBar>
            <ToastButton onClick={this.onViewSelect("Tags")}>Tags</ToastButton>
            <ToastButton onClick={this.onViewSelect("Recent")}>Recent</ToastButton>
        </ToastBar>
      </SidebarContainer>
    );
  }
}

Sidebar.propTypes = {};

const mapStateToProps = state => {
  return {
    query: query(state)
  };
};

export default connect(mapStateToProps)(mutate(Sidebar, "Sidebar"));
