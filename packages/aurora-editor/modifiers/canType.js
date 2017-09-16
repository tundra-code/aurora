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
      this.onChange = editorState => {
        this.setState({ editorState });
      };
    }

    render() {
      return (
        <Editor
          onChange={this.onChange}
          editorState={this.state.editorState}
          {...this.props}
        />
      );
    }
  }

  CanTypeEditor.propTypes = {
    defaultEditorState: PropTypes.object
  };

  return CanTypeEditor;
};

export default canType;
