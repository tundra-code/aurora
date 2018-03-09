import React from "react";
import PropTypes from "prop-types";
import Editor from "draft-js-plugins-editor";
import { mutate } from "@react-mutate/core";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  serializeContent,
  deSerializeContent,
  getSearchableText
} from "./index";
import { serializePreview } from "./Preview";

const EditorStyles = styled.div`
  padding: ${props => props.theme.spacing.padding};
  .public-DraftEditorPlaceholder-inner {
    pointer-events: none;
    color: #aaaaaa;
  }
`;

/**
 * A really basic editor that can type and focus and maintain editor state.
 * Also can do rich-styling.
 */
class BaseEditor extends React.Component {
  constructor(props) {
    super(props);
    this.setDomEditorRef = ref => (this.editor = ref);
  }

  handleFocus = () => {
    if (!this.domEditor) {
      return;
    }

    if (this.props.focused) {
      this.domEditor.focus();
    }
  };

  componentDidUpdate(prevProps) {
    const contentLoaded =
      prevProps.isLoadingContent === true &&
      this.props.isLoadingContent === false;
    if (contentLoaded) {
      this.finishedLoadingContent();
    }
  }

  finishedLoadingContent = () => {
    this.props.note.getContent().then(content => {
      const editorState = deSerializeContent(
        content[this.props.note.mutationName]
      );
      if (this.props.onContentLoaded) {
        this.props.onContentLoaded(editorState);
      }
    });
  };

  onChange = editorState => {
    const serializedContent = serializeContent(editorState);
    const serializedPreview = serializePreview(editorState);
    const searchableText = getSearchableText(editorState);

    if (this.props.onChangeEx) {
      this.props.onChangeEx(
        editorState,
        serializedContent,
        serializedPreview,
        searchableText
      );
    }
  };

  onBlur = () => {
    if (this.props.onBlurEx) {
      this.props.onBlurEx();
    }
  };

  onFocus = () => {
    if (this.props.onFocusEx) {
      this.props.onFocusEx();
    }
  };

  componentDidMount() {
    this.handleFocus();
  }

  render() {
    return (
      <EditorStyles>
        <Editor
          className="editor"
          ref={this.setDomEditorRef}
          onChange={this.onChange}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          editorState={this.props.ourEditorState}
          {...this.props}
        />
      </EditorStyles>
    );
  }
}

BaseEditor.propTypes = {
  onChangeEx: PropTypes.func,
  onBlurEx: PropTypes.func,
  onFocusEx: PropTypes.func,
  onContentLoaded: PropTypes.func,
  note: PropTypes.object,
  ourEditorState: PropTypes.object,
  isLoadingContent: PropTypes.bool
};

export default connect()(mutate(BaseEditor, "BaseEditor"));
