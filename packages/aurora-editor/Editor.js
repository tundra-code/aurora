import React from "react";
import { Editor, EditorState, getDefaultKeyBinding } from "draft-js";
import PropTypes from "prop-types";

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

class AuroraEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorState: EditorState.createEmpty() };
    this.onChange = editorState => {
      props.onChange(editorState.getCurrentContent().getPlainText());
      this.setState({ editorState });
    };

    this.setDomEditorRef = ref => (this.domEditor = ref);
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }

  componentDidMount() {
    this.domEditor.focus();
  }

  componentDidUpdate() {
    this.domEditor.focus();
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
      this.props.onSubmit(
        this.state.editorState.getCurrentContent().getPlainText()
      );

      this.setState({
        editorState: EditorState.createEmpty()
      });

      return HANDLED;
    }
    return NOT_HANDLED;
  }

  render() {
    return (
      <Editor
        editorState={this.state.editorState}
        onChange={this.onChange}
        keyBindingFn={this.onKeyPressed}
        handleKeyCommand={this.handleKeyCommand}
        ref={this.setDomEditorRef}
      />
    );
  }
}

AuroraEditor.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

export default AuroraEditor;
