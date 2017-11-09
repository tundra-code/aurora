import React from "react";
import PropTypes from "prop-types";
import { Editor } from "draft-js";
import "draft-js/dist/Draft.css";
import { mutate } from "@react-mutate/core";
import styled from "styled-components";

const EditorStyles = styled.div`
  padding: ${props => props.theme.spacing.padding};
`;

/**
 * A really basic editor that doesn't actually do anything other than have an editor className and can be focused
 * It might do something in the future, but at the moment it serves as a base to apply modifiers
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

  componentDidMount() {
    this.handleFocus();
  }

  render() {
    return (
      <EditorStyles>
        <Editor className="editor" ref={this.setDomEditorRef} {...this.props} />
      </EditorStyles>
    );
  }
}

BaseEditor.propTypes = {
  editorState: PropTypes.object.isRequired,
  focused: PropTypes.bool
};

export default mutate(BaseEditor, "BaseEditor");
