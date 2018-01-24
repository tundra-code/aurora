import React from "react";
import PropTypes from "prop-types";
import { RichUtils, Editor } from "draft-js";
import { mutate } from "@react-mutate/core";
import styled from "styled-components";
import { connect } from "react-redux";
import { EDITOR_NAME, serializeContent } from "./index";
import {
  setEditorState,
  updateNote,
  selectNote,
  deleteNote,
  saveNote
} from "../../redux/actions";

const EditorStyles = styled.div`
  padding: ${props => props.theme.spacing.padding};
  .public-DraftEditorPlaceholder-inner {
    pointer-events: none;
    color: #aaaaaa;
  }
`;

/**
 * A really basic editor that can type and focus and maintain editor state.
 * Also can do rich-styling.
 */
class BaseEditor extends React.Component {
  constructor(props) {
    super(props);
    this.setDomEditorRef = ref => (this.domEditor = ref);
  }

  handleFocus = () => {
    if (!this.domEditor) {
      return;
    }

    if (this.props.focused) {
      this.domEditor.focus();
    }
  };

  onChange = editorState => {
    this.props.dispatch(setEditorState(editorState));

    const note = this.props.note;
    const content = serializeContent(editorState);
    note.setContent(content);
    note.updatePreview();
    this.props.dispatch(updateNote(note));

    if (this.props.onChangeEx) {
      this.props.onChangeEx(editorState);
    }
  };

  componentDidMount() {
    this.handleFocus();
  }

  removeNote = note => {
    this.props.dispatch(deleteNote(note));
    this.props.dispatch(selectNote(null));
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

  onBlur = () => {
    this.checkAndSaveNote();
  };

  // rich styling here
  handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      if (window.styling) {
        this.onChange(newState);
      }
      return "handled";
    }
    return "not-handled";
  };

  render() {
    return (
      <EditorStyles>
        <Editor
          className="editor"
          ref={this.setDomEditorRef}
          onChange={this.onChange}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          editorState={this.props.ourEditorState}
          handleKeyCommand={this.handleKeyCommand}
          {...this.props}
        />
      </EditorStyles>
    );
  }
}

BaseEditor.propTypes = {
  focused: PropTypes.bool,
  onChangeEx: PropTypes.func,
  selectNote: PropTypes.object,
  ourEditorState: PropTypes.object.isRequired
};

export default connect()(mutate(BaseEditor, EDITOR_NAME));
