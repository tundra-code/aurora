import React from "react";
import { Card } from "../../aurora-ui";
import { Editor, modifiers } from "../../aurora-editor";
import PropTypes from "prop-types";
import DeleteButton from "./DeleteButton";
import styled from "styled-components";

const PartialWidthDiv = styled.div`
  float: left;
  width: 70%;
  margin-bottom: 0;
`;

const TypingEditor = props => {
  const _Editor = modifiers.canType(Editor);

  return <_Editor {...props} />;
};

class Note extends React.Component {
  onUpdate = editorState => {
    this.props.onUpdate(this.props.id, editorState);
  };

  onBlur = () => {
    this.props.onFocusEnded(this.props.id);
  };

  onClick = () => {
    this.props.onClick();
  };

  render() {
    return (
      <Card expanded onClick={this.onClick}>
        <PartialWidthDiv>
          <TypingEditor
            defaultEditorState={this.props.defaultEditorState}
            onUpdate={this.onUpdate}
            onBlur={this.onBlur}
            focused={this.props.focused}
          />
        </PartialWidthDiv>
        <DeleteButton {...this.props} />
      </Card>
    );
  }
}

Note.propTypes = {
  defaultEditorState: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onFocusEnded: PropTypes.func.isRequired
};

export default Note;
