import { Editor } from "../editor";
import { RichUtils } from "draft-js";
import React from "react";
import PropTypes from "prop-types";
import { mutate } from "@react-mutate/core";

/**
 * A really basic editor that can type and focus and maintain editor state.
 */
class StyledEditor extends React.Component {
  constructor(props) {
    super(props);
  }

  handleKeyCommand = (command, editorState) => {
    if (this.props.handleKeyCommandEx) {
      this.props.handleKeyCommandEx(command, editorState);
    }
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.editor.onChange(newState);
      return "handled";
    }
    return "not-handled";
  };

  render() {
    //return super.render();
    return (
      <Editor
        ref={instance => {
          this.editor = instance;
        }}
        handleKeyCommand={this.handleKeyCommand}
        {...this.props}
      />
    );
  }
}

StyledEditor.propTypes = {
  handleKeyCommandEx: PropTypes.func
};

export default mutate(StyledEditor, "StyledEditor");
