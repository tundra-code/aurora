import React from "react";
import styled from "styled-components";
import { NoteList } from "../aurora-ui";
import FeedEditor from "./FeedEditor.js";
import PropTypes from "prop-types";
import { Map } from "immutable-props";

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
        onBlur={props.onBlur}
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
  notes: Map,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  inputEditorState: PropTypes.object.isRequired,
  inputEditorFocused: PropTypes.bool
};

export default StatelessFeedView;
