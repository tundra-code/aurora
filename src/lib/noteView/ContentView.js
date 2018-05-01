import React from "react";
import { mutate } from "@react-mutate/core";
import {
  Editor,
  serializeContent,
  deSerializeContent,
  emptyEditorState,
  emptySerializedEditorState,
  serializePreview
} from "../editor";
import PropTypes from "prop-types";

class ContentView extends React.Component {
  finishedLoadingContent = () => {
    this.props.note.getContent().then(content => {
      const editorState = deSerializeContent(
        content[this.props.note.mutationName]
      );
      this.props.onContentLoaded(editorState);
    });
  };

  render() {
    if (this.props.note && this.props.note.mutationName === "BaseEditor") {
      return (
        <div>
          <Editor
            {...this.props}
            finishedLoadingContent={this.finishedLoadingContent}
          />
        </div>
      );
    }
    return (
      <div>
        <p>Note cannot be rendered!</p>
        <p>
          Extension {this.props.note.mutationName} is required, but is not
          installed. Try Extensions - Add New Extension to install it.
        </p>
      </div>
    );
  }
}

ContentView.propTypes = {
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  onContentLoaded: PropTypes.func.isRequired,
  selectNote: PropTypes.object,
  note: PropTypes.object.isRequired,
  ourEditorState: PropTypes.object.isRequired,
  isLoadingContent: PropTypes.bool.isRequired
};

const API = () => {
  return {
    Editor: Editor,
    serializeContent: serializeContent,
    deSerializeContent: deSerializeContent,
    emptyEditorState: emptyEditorState,
    emptySerializedEditorState: emptySerializedEditorState,
    serializePreview: serializePreview
  };
};

export default mutate(ContentView, "ContentView", API);
