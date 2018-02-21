import React from "react";
import { mutate } from "@react-mutate/core";
import { Editor } from "../editor";
import PropTypes from "prop-types";

class ContentView extends React.Component {
  render() {
    return (
      <div>
        <Editor {...this.props} />
      </div>
    );
  }
}

ContentView.propTypes = {
  onChangeEx: PropTypes.func,
  onBlurEx: PropTypes.func,
  onContentLoaded: PropTypes.func,
  selectNote: PropTypes.object,
  ourEditorState: PropTypes.object.isRequired,
  isLoadingContent: PropTypes.bool.isRequired
};

export default mutate(ContentView, "ContentView");
