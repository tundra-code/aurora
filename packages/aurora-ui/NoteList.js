import React from "react";
import Animate, { FadeInUp } from "animate-css-styled-components";
import { NoteView, NoteModel } from "../aurora-note";
import styled from "styled-components";
import PropTypes from "prop-types";

const NoteWrapper = styled.div`
  width: 100%;
  padding-bottom: 50px;
`;

const NoteList = props => {
  const ids = Object.keys(props.notes);
  const notes = ids.map(id => {
    return (
      <Animate key={id} Animation={[FadeInUp]} duration={"0.2s"}>
        <NoteView
          id={id}
          key={id}
          defaultEditorState={props.notes[id].editorState}
          onDelete={props.onDelete}
          onUpdate={props.onUpdate}
        />
      </Animate>
    );
  });

  return <NoteWrapper className="note-wrapper">{notes}</NoteWrapper>;
};

NoteList.propTypes = {
  notes: PropTypes.objectOf(PropTypes.instanceOf(NoteModel)).isRequired,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired
};

export default NoteList;
