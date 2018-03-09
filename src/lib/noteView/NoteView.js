import React from "react";
import { connect } from "react-redux";
import { mutate } from "@react-mutate/core";
import styled from "styled-components";
import PropTypes from "prop-types";
import ContentView from "./ContentView";
import { Card, Container } from "../ui";
import {
  updateAndSaveNote,
  setEditorState,
  updateNote,
  selectNote,
  deleteNote,
  saveNote
} from "../../redux/actions";
import TagContainer from "./TagContainer";
import TagModel from "../note/Tag";
import { getDefaultKeyBinding, KeyBindingUtil } from "draft-js";
import moment from "moment";

const DeleteButton = styled.button`
  float: right;
  background: transparent;
  border: none;
  position: relative;
  top: -${props => 2 * props.theme.spacing.padding};
  font-size: ${props => props.theme.fontSize};
`;

const InsetText = styled.div`
  color: ${props => props.theme.colors.insetText};
`;

const SavedAtDiv = InsetText.extend`
  padding: ${props => props.theme.spacing.padding};
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

const { hasCommandModifier } = KeyBindingUtil;

class NoteView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tagInputValue: "",
      focused: false
    };
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.note &&
      this.props.note &&
      prevProps.note.uuid !== this.props.note.uuid
    ) {
      this.setState({ tagInputValue: "" });
    }
  }

  onDelete = () => {
    if (this.props.note === null) {
      return;
    }
    if (window.confirm("Are you sure you want to delete this note?")) {
      this.props.delete(this.props.note);
      this.setState({ tagInputValue: "" });
      this.removeNote(this.props.note);
    }
  };

  _getTags = () => {
    if (!this.props.note) {
      return [];
    }

    return this.props.note.getTags();
  };

  onTagInputChange = event => {
    this.setState({ tagInputValue: event.target.value });
  };

  onTagSubmit = () => {
    const note = this.props.note;
    note.addTag(new TagModel(this.state.tagInputValue));
    this.props.updateAndSaveNote(note);

    // Clear text input
    this.setState({ tagInputValue: "" });
  };

  onTagDelete = tag => {
    const note = this.props.note;
    note.removeTag(tag.uuid);
    this.props.updateAndSaveNote(note);
  };

  removeNote = note => {
    this.props.dispatch(deleteNote(note));
    this.props.dispatch(selectNote(null));
  };

  onEditorChange = (
    editorState,
    serializedContent,
    serializedPreview,
    searchableText
  ) => {
    const note = this.props.note;
    this.props.dispatch(setEditorState(editorState));

    if (this.state.focused) {
      if (serializedContent) {
        note.setContent(serializedContent);
      }
      if (serializedPreview) {
        note.setPreview(serializedPreview);
      }
      if (searchableText) {
        note.searchableText = searchableText;
      }
      this.props.dispatch(updateNote(note));
    }
  };

  onEditorContentLoaded = editorState => {
    this.props.dispatch(setEditorState(editorState));
  };

  checkAndSaveNote = () => {
    const note = this.props.note;
    if (note === null) {
      return;
    }
    this.props.dispatch(saveNote(note));
  };

  saveKeyBinding = e => {
    if (e.keyCode === 83 && hasCommandModifier(e)) {
      return "save-note";
    }
    return getDefaultKeyBinding(e);
  };

  handleKeyCommand = command => {
    if (command === "save-note") {
      this.checkAndSaveNote();
      return "handled";
    }
    return "not-handled";
  };

  onEditorBlur = () => {
    this.setState({ focused: false }, () => {
      this.checkAndSaveNote();
    });
  };

  onEditorFocus = () => {
    this.setState({ focused: true });
  };

  render() {
    if (this.props.note === null) {
      return (
        <InsetText>Create new note or select note from sidebar.</InsetText>
      );
    }

    const tags = this._getTags();
    const savedAt = moment(this.props.note.updated_at).format(
      "M/D/YY hh:mm:ss a"
    );

    return (
      <BumpedDownContainer>
        <NoteViewContainer>
          <TopViewContainer>
            <DeleteButton onClick={this.onDelete}>🗑</DeleteButton>
            <ContentView
              {...this.props}
              onChangeEx={this.onEditorChange}
              onBlurEx={this.onEditorBlur}
              onContentLoaded={this.onEditorContentLoaded}
              onFocusEx={this.onEditorFocus}
              keyBindingFn={this.saveKeyBinding}
              handleKeyCommand={this.handleKeyCommand}
            />
            <SavedAtDiv>Last saved at {savedAt}</SavedAtDiv>
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
    delete: note => dispatch(deleteNote(note))
  };
};

export default connect(null, mapDispatchToProps)(mutate(NoteView, "NoteView"));
