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
    this.state = {
      focused: props.focused
    };
    this.setDomEditorRef = ref => (this.domEditor = ref);
  }

  componentDidMount() {
    if (this.state.focused) {
      this.domEditor.focus();
    }
  }

  handleEditor = () => {
    if (this.state.focused) {
      this.domEditor.focus();
    } else {
      this.domEditor.blur();
    }
  };

  render() {
    if (this.domEditor) {
      this.handleEditor();
    }

    return (
      <Editor
        onBlur={this.setState({ focused: false })}
        className="editor"
        ref={this.setDomEditorRef}
        {...this.props}
      />
    );
  }
}

AbstractEditor.propTypes = {
  editorState: PropTypes.object.isRequired,
  focused: PropTypes.bool
};

export default AbstractEditor;
