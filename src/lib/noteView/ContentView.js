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
  render() {
    if (this.props.note && this.props.note.mutationName === "BaseEditor") {
      return (
        <div>
          <Editor {...this.props} />
        </div>
      );
    }
    return (
      <div>
        <p>Note cannot be rendered!</p>
        <p>
          Mutation {this.props.note.mutationName} is required, but is not
          installed. Try Mutations - Add New Mutation to install it.
        </p>
      </div>
    );
  }
}

ContentView.propTypes = {
  onChangeEx: PropTypes.func,
  onBlurEx: PropTypes.func,
  onContentLoaded: PropTypes.func,
  selectNote: PropTypes.object,
  note: PropTypes.object,
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
