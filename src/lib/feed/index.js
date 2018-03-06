import React from "react";
import { connect } from "react-redux";
import { mutate } from "@react-mutate/core";
import {
  selectedNote,
  editorState,
  isLoadingContent
} from "../../redux/selectors";
import { NoteView } from "../noteView";
import styled from "styled-components";
import { selectNote, newNote } from "../../redux/actions";
import { Container } from "../ui";
import { NoteModel } from "../note";
import Menu, { SubMenu, MenuItem } from "rc-menu";
import "rc-menu/assets/index.css";

const AddButtonContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: ${props => props.theme.spacing.padding};

  .rc-menu {
    background: white;
    width: 150px;
    cursor: pointer;
  }
`;

class Feed extends React.Component {
  constructor(props) {
    super(props);
  }

  newNote = mutationName => {
    return new NoteModel(
      window.editors[mutationName].newNoteContent,
      mutationName,
      []
    );
  };

  newNoteSelected = info => {
    const note = this.newNote(info.key);
    this.props.dispatch(newNote(note));
    this.props.dispatch(selectNote(note));
  };

  createAddMenu = () => {
    let addMenu = null;
    if (Object.keys(window.editors).length === 1) {
      addMenu = (
        <MenuItem key={Object.keys(window.editors)[0]}>New Note</MenuItem>
      );
    } else {
      const subMenu = Object.keys(window.editors).map(t => (
        <MenuItem key={t}>{window.editors[t].screenName}</MenuItem>
      ));
      addMenu = <SubMenu title="New Note">{subMenu}</SubMenu>;
    }
    return addMenu;
  };

  render() {
    return (
      <Container>
        <AddButtonContainer>
          <Menu selectedKeys={[]} onSelect={this.newNoteSelected}>
            {this.createAddMenu()}
          </Menu>
        </AddButtonContainer>
        <NoteView
          ourEditorState={this.props.editorState}
          note={this.props.selectedNote}
          placeholder={"Change me!"}
          {...this.props}
        />
      </Container>
    );
  }
}

Feed.propTypes = {};

const mapStateToProps = state => {
  return {
    selectedNote: selectedNote(state),
    editorState: editorState(state),
    isLoadingContent: isLoadingContent(state)
  };
};

export default connect(mapStateToProps)(mutate(Feed, "Feed"));
