import React from "react";
import { Card } from "../aurora-ui";
import { Editor, modifiers } from "../aurora-editor";
import PropTypes from "prop-types";

const TypingEditor = props => {
  const _Editor = modifiers.canType(Editor);

  return <_Editor {...props} />;
};

class Note extends React.Component {
  render() {
    return (
      <Card expanded>
        <TypingEditor
          defaultEditorState={this.props.defaultEditorState}
          readOnly
        />
      </Card>
    );
  }
}

Note.propTypes = {
  defaultEditorState: PropTypes.object.isRequired
};

export default Note;
