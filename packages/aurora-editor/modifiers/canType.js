import React from "react";
import PropTypes from "prop-types";
import { EditorState } from "draft-js";

/**
 * Gives an editor really basic typing capabilities. If you press some keys, something will happen.
 * @param {React} Editor
 */
const canType = Editor => {
  class CanTypeEditor extends React.Component {
    constructor(props) {
      super(props);

      // Let the user pass in a defaultEditorState if they want to.
      const startEditorState = this.props.defaultEditorState
        ? this.props.defaultEditorState
        : EditorState.createEmpty();

      this.state = { editorState: startEditorState };
    }

    onChange = editorState => {
      this.setState({ editorState });
      this.props.onUpdate(editorState);
    };

    render() {
      return (
        <Editor
          onChange={this.onChange}
          editorState={this.state.editorState}
          onBlur={this.props.onBlur}
          {...this.props}
        />
      );
    }
  }

  CanTypeEditor.propTypes = {
    defaultEditorState: PropTypes.object,
    onUpdate: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired
  };

  return CanTypeEditor;
};

export default canType;
