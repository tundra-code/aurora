import React from "react";
import PropTypes from "prop-types";
import { Editor } from "draft-js";

/**
 * A really basic editor that doesn't actually do anything other than have an editor className and can be focused
 * It might do something in the future, but at the moment it serves as a base to apply modifiers
 */
class AbstractEditor extends React.Component {
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

  componentDidMount() {
    if (this.started) {
      return;
    }

    this.handleFocus();
    this.started = true;
  }

  render() {
    return (
      <Editor className="editor" ref={this.setDomEditorRef} {...this.props} />
    );
  }
}

AbstractEditor.propTypes = {
  editorState: PropTypes.object.isRequired,
  focused: PropTypes.bool
};

export default AbstractEditor;
