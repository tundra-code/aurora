import React from "react";
import PropTypes from "prop-types";
import { RichUtils, Editor } from "draft-js";
import { mutate } from "@react-mutate/core";
import styled from "styled-components";
import { connect } from "react-redux";
import { EDITOR_NAME, serializeContent } from "./index";
import {
  setEditorState,
  updateAndSaveNote,
  newNote,
  selectNote,
  deleteNote
} from "../../redux/actions";
import { noteWithEmptyEditor } from "./util";

const EditorStyles = styled.div`
  padding: ${props => props.theme.spacing.padding};
  .public-DraftEditorPlaceholder-inner {
    pointer-events: none;
    position: absolute;
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
    if (this.props.onChangeEx) {
      this.props.onChangeEx(editorState);
    }
  };

  componentDidMount() {
    this.handleFocus();
  }

  // trying to save upon quitting without onBlur. But doesn't work currently.
  componentWillUnmount() {
    this.updateAndSaveNote();
  }

  createNewNote = () => {
    const note = noteWithEmptyEditor();
    this.props.dispatch(newNote(note));
    this.props.dispatch(selectNote(note));
  };

  onFocus = () => {
    if (this.props.note !== null) {
      return;
    }
    this.createNewNote();
  };

  removeNote = note => {
    this.props.dispatch(deleteNote(note));
    this.props.dispatch(selectNote(null));
  };

  updateAndSaveNote = () => {
    const note = this.props.note;
    if (note === null) {
      return;
    }
    if (!this.props.ourEditorState.getCurrentContent().hasText()) {
      this.removeNote(note);
      return;
    }
    const content = serializeContent(this.props.ourEditorState);
    note.setContent(content);
    note.updatePreview();
    this.props.dispatch(updateAndSaveNote(note));
  };

  onBlur = () => {
    this.updateAndSaveNote();
  };

  // rich styling here
  handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
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
