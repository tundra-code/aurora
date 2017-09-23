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
  render() {
    return (
      <Card expanded>
        <PartialWidthDiv>
          <TypingEditor
            defaultEditorState={this.props.defaultEditorState}
            readOnly
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
  onDelete: PropTypes.func.isRequired
};

export default Note;
