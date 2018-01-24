import React from "react";
import PropTypes from "prop-types";
import { Editor } from "draft-js";
import { mutate } from "@react-mutate/core";
import styled from "styled-components";
import { connect } from "react-redux";
import { EDITOR_NAME, serializeContent } from "./index";

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

  onChange = editorState => {
    const serializedContent = serializeContent(editorState);

    if (this.props.onChangeEx) {
      this.props.onChangeEx(editorState, serializedContent);
    }
  };

  onBlur = () => {
    if (this.props.onBlurEx) {
      this.props.onBlurEx();
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
          handleKeyCommand={this.handleKeyCommand}
          {...this.props}
        />
      </EditorStyles>
    );
  }
}

BaseEditor.propTypes = {
  focused: PropTypes.bool,
  onChangeEx: PropTypes.func,
  selectNote: PropTypes.object,
  ourEditorState: PropTypes.object.isRequired
};

export default connect()(mutate(BaseEditor, EDITOR_NAME));
