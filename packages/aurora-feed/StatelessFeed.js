import React from "react";
import styled from "styled-components";
import { NoteList } from "../aurora-ui";
import FeedEditor from "./FeedEditor.js";
import { NoteModel } from "../aurora-note";
import PropTypes from "prop-types";

const FlexSeperated = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
`;

const StatelessFeedView = props => {
  return (
    <FlexSeperated className="flex-seperated">
      <NoteList
        notes={props.notes}
        onDelete={props.onDelete}
        onUpdate={props.onUpdate}
      />
      <FeedEditor
        className="card-at-bottom-editor"
        onSubmit={props.onSubmit}
        onChange={props.onChange}
        editorState={props.inputEditorState}
        focused={props.inputEditorFocused}
      />
    </FlexSeperated>
  );
};

StatelessFeedView.propTypes = {
  notes: PropTypes.objectOf(PropTypes.instanceOf(NoteModel)).isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  inputEditorState: PropTypes.object.isRequired,
  inputEditorFocused: PropTypes.bool
};

export default StatelessFeedView;
