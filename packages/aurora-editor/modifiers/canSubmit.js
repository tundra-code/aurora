import React from "react";
import PropTypes from "prop-types";
import { getDefaultKeyBinding } from "draft-js";

const SUBMIT_EVENT = "shift-enter";
const HANDLED = "handled";
const NOT_HANDLED = "not-handled";

/**
 * Returns true if this event is what we defined to be submit.
 * Currently Shift+Enter
 * @param {SyntheticEvent} event
 */
function isSubmitEvent(event) {
  const isEnter = event.nativeEvent.keyCode === 13;
  const isShift = event.nativeEvent.shiftKey;
  return isEnter && isShift;
}

function canSubmit(Editor) {
  class SubmitEditor extends React.Component {
    constructor(props) {
      super(props);

      this.handleKeyCommand = this.handleKeyCommand.bind(this);
    }

    // If we found the correct key commands to be a submit event, tell
    // draft that we found a SUBMIT_EVENT
    onKeyPressed(event) {
      if (isSubmitEvent(event)) {
        return SUBMIT_EVENT;
      }
      return getDefaultKeyBinding(event);
    }

    // If the event is a SUBMIT_EVENT, pass up the state.
    handleKeyCommand(command) {
      if (command === SUBMIT_EVENT) {
        this.props.onSubmit(this.props.editorState);

        return HANDLED;
      }
      return NOT_HANDLED;
    }

    render() {
      return (
        <Editor
          placeholder="Type here to search or to create a note"
          keyBindingFn={this.onKeyPressed}
          handleKeyCommand={this.handleKeyCommand}
          {...this.props}
        />
      );
    }
  }

  SubmitEditor.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    editorState: PropTypes.object.isRequired
  };

  return SubmitEditor;
}

export default canSubmit;
