import React from "react";
import { connect } from "react-redux";
import { mutate } from "@react-mutate/core";
import {
  selectedNote,
  editorState,
  isLoadingContent
} from "../../redux/selectors";
import NoteView from "../note/NoteView";
import styled from "styled-components";
import { selectNote, newNote, loadNoteContent } from "../../redux/actions";
import { noteWithEmptyEditor } from "../editor";
import { Container } from "../ui";

const AddButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

const AddButton = styled.a`
  cursor: pointer;
  color: ${props => props.theme.colors.darkPrimary};
  padding: ${props => props.theme.spacing.padding};

  &:hover {
    color: ${props => props.theme.colors.primary};
    text-decoration: underline;
  }
`;

class Feed extends React.Component {
  constructor(props) {
    super(props);
  }

  onAdd = () => {
    const note = noteWithEmptyEditor();
    this.props.dispatch(newNote(note));
    this.props.dispatch(selectNote(note));
  };

  componentDidUpdate(prevProps) {
    if (this.props.selectedNote === null) {
      return;
    }
    if (this.props.selectedNote !== prevProps.selectedNote) {
      this.props.dispatch(loadNoteContent(this.props.selectedNote));
    }
  }

  render() {
    return (
      <Container>
        <AddButtonContainer>
          <AddButton onClick={this.onAdd}>📝 New Note</AddButton>
        </AddButtonContainer>
        <NoteView
          ourEditorState={this.props.editorState}
          note={this.props.selectedNote}
          placeholder={"Change me!"}
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
