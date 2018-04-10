import React from "react";
import PropTypes from "prop-types";
import Editor from "draft-js-plugins-editor";
import { mutate } from "@react-mutate/core";
import styled from "styled-components";
import { connect } from "react-redux";
import { serializeContent, getSearchableText } from "./index";
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
      this.props.finishedLoadingContent();
    }

    const simulatedKeyCommand =
      prevProps.simulatedKeyCommand === null &&
      this.props.simulatedKeyCommand !== null;
    if (simulatedKeyCommand) {
      this.props.handleKeyCommand(
        this.props.simulatedKeyCommand,
        this.props.ourEditorState
      );
    }
  }

  onChange = editorState => {
    const serializedContent = serializeContent(editorState);
    const serializedPreview = serializePreview(editorState);
    const searchableText = getSearchableText(editorState);

    this.props.onChange(
      editorState,
      serializedContent,
      serializedPreview,
      searchableText
    );
  };

  componentDidMount() {
    this.handleFocus();
  }

  render() {
    const { onChange, ...props } = this.props; // eslint-disable-line
    return (
      <EditorStyles>
        <Editor
          className="editor"
          ref={this.setDomEditorRef}
          onChange={this.onChange}
          editorState={this.props.ourEditorState}
          placeholder={"Change me!"}
          {...props}
        />
      </EditorStyles>
    );
  }
}

BaseEditor.propTypes = {
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  note: PropTypes.object,
  ourEditorState: PropTypes.object.isRequired,
  isLoadingContent: PropTypes.bool,
  finishedLoadingContent: PropTypes.func
};

export default connect()(mutate(BaseEditor, "BaseEditor"));
