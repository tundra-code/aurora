import React from "react";
import PropTypes from "prop-types";
import { RichUtils, Editor, EditorState } from "draft-js";
import { mutate } from "@react-mutate/core";
import styled from "styled-components";

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

    // Let the user pass in a defaultEditorState if they want to.
    const startEditorState = this.props.defaultEditorState
      ? this.props.defaultEditorState
      : EditorState.createEmpty();

    this.state = { editorState: startEditorState };
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
    this.setState({ editorState });
    if (this.props.onChangeEx) {
      this.props.onChangeEx(editorState);
    }
  };

  componentDidMount() {
    this.handleFocus();
  }

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
          editorState={this.state.editorState}
          handleKeyCommand={this.handleKeyCommand}
          {...this.props}
        />
      </EditorStyles>
    );
  }
}

BaseEditor.propTypes = {
  focused: PropTypes.bool,
  defaultEditorState: PropTypes.object,
  onChangeEx: PropTypes.func
};

export default mutate(BaseEditor, "BaseEditor");
