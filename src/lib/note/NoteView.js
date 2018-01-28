import React from "react";
import { connect } from "react-redux";
import { mutate } from "@react-mutate/core";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Card, Container } from "../ui";
import { Editor } from "../editor";
import {
  deleteNoteAndChangeSelection,
  updateAndSaveNote,
  setEditorState,
  updateNote,
  selectNote,
  deleteNote,
  saveNote
} from "../../redux/actions";
import TagContainer from "./TagContainer";
import TagModel from "./Tag";
import _ from "lodash";

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

const NoteViewContainer = Card.extend`
  padding: 0;
`;

const TopViewContainer = styled.div`
  padding: ${props => props.theme.spacing.padding};
`;

class NoteView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tagInputValue: ""
    };
  }

  onDelete = () => {
    if (this.props.note === null) {
      return;
    }

    this.props.delete(this.props.note);
    this.setState({ tagInputValue: "" });
  };

  _getTags = () => {
    if (!this.props.note) {
      return [];
    }

    return this.props.note.tags;
  };

  onTagInputChange = event => {
    this.setState({ tagInputValue: event.target.value });
  };

  onTagSubmit = () => {
    // We need to clone because NoteModel should not be a class
    const note = _.clone(this.props.note);
    note.addTag(new TagModel(this.state.tagInputValue));
    this.props.updateAndSaveNote(note);

    // Clear text input
    this.setState({ tagInputValue: "" });
  };

  onTagDelete = tag => {
    // We need to clone because NoteModel should not be a class
    const note = _.clone(this.props.note);
    note.removeTag(tag.id);
    this.props.updateAndSaveNote(note);
    this.removeNote(this.props.note);
  };

  removeNote = note => {
    this.props.dispatch(deleteNote(note));
    this.props.dispatch(selectNote(null));
  };

  onEditorChange = (editorState, serializedContent, serializedPreview) => {
    const note = this.props.note;
    this.props.dispatch(setEditorState(editorState));
    note.setContent(serializedContent);
    note.setPreview(serializedPreview);
    this.props.dispatch(updateNote(note));
  };

  onEditorContentLoaded = editorState => {
    this.props.dispatch(setEditorState(editorState));
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
    const tags = this._getTags();
    if (this.props.note === null) {
      return (
        <InsetText>Create new note or select note from sidebar.</InsetText>
      );
    }
    return (
      <BumpedDownContainer>
        <NoteViewContainer>
            <TopViewContainer>
              <DeleteButton onClick={this.onDelete}>🗑</DeleteButton>
              <Editor {...this.props} />
            </TopViewContainer>
            <TagContainer
              tags={tags}
              tagInputValue={this.state.tagInputValue}
              onChange={this.onTagInputChange}
              onEnterPress={this.onTagSubmit}
              onTagDelete={this.onTagDelete}
            />
          </NoteViewContainer>
      </BumpedDownContainer>
    );
  }
}

NoteView.propTypes = {
  note: PropTypes.object
};

const mapDispatchToProps = dispatch => {
  return {
    updateAndSaveNote: note => dispatch(updateAndSaveNote(note)),
    delete: note => dispatch(deleteNoteAndChangeSelection(note))
  };
};

export default connect(null, mapDispatchToProps)(mutate(NoteView, "NoteView"));
