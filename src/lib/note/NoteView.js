import React from "react";
import { connect } from "react-redux";
import { mutate } from "@react-mutate/core";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Card, Container } from "../ui";
import { Editor } from "../editor";
import {
  setEditorState,
  updateNote,
  selectNote,
  deleteNote,
  saveNote
} from "../../redux/actions";

const DeleteButton = styled.button`
  float: right;
  background: transparent;
  border: none;
  position: relative;
  right: -20px;
  top: -30px;
  font-size: ${props => props.theme.fontSize};
`;

const InsetText = styled.div`
  color: ${props => props.theme.colors.insetText};
`;

const BumpedDownContainer = Container.extend`
  padding-top: ${props => props.theme.spacing.header};
  padding: 0;
`;

class NoteView extends React.Component {
  constructor(props) {
    super(props);
  }

  onDelete = () => {
    if (this.props.note === null) {
      return;
    }
    this.props.dispatch(deleteNote(this.props.note));
    this.props.dispatch(selectNote(null));
  };

  onEditorChange = (editorState, serializedContent) => {
    const note = this.props.note;
    this.props.dispatch(setEditorState(editorState));
    note.setContent(serializedContent);
    note.updatePreview();
    this.props.dispatch(updateNote(note));
  };

  checkAndSaveNote = () => {
    const note = this.props.note;
    if (note === null) {
      return;
    }
    // if (!this.props.ourEditorState.getCurrentContent().hasText()) {
    //   this.removeNote(note);
    //   return;
    // }
    saveNote(note);
  };

  onEditorBlur = () => {
    this.checkAndSaveNote();
  };

  render() {
    if (this.props.note === null) {
      return (
        <InsetText>Create new note or select note from sidebar.</InsetText>
      );
    }
    return (
      <BumpedDownContainer>
        <Card>
          <DeleteButton onClick={this.onDelete}>🗑</DeleteButton>
          <Editor
            {...this.props}
            onChangeEx={this.onEditorChange}
            onBlurEx={this.onEditorBlur}
          />
        </Card>
      </BumpedDownContainer>
    );
  }
}

NoteView.propTypes = {
  note: PropTypes.object
};

export default connect()(mutate(NoteView, "NoteView"));
