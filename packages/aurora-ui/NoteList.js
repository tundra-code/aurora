import React from "react";
import Animate, { FadeInUp } from "animate-css-styled-components";
import { NoteView } from "../aurora-note";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Map } from "immutable-props";

const NoteWrapper = styled.div`
  width: 100%;
  padding-bottom: 50px;
`;

class NoteList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const ids = this.props.notes.keySeq().toArray();
    const notes = ids.map(id => {
      const onBlur = () => {
        this.props.onBlur(id);
      };

      return (
        <Animate key={id} Animation={[FadeInUp]} duration={"0.2s"}>
          <NoteView
            id={id}
            key={`${id}-note`}
            defaultEditorState={this.props.notes.get(id).editorState}
            onDelete={this.props.onDelete}
            onUpdate={this.props.onUpdate}
            onClick={this.props.onClick}
            onBlur={onBlur}
          />
        </Animate>
      );
    });

    return <NoteWrapper className="note-wrapper">{notes}</NoteWrapper>;
  }
}

NoteList.propTypes = {
  notes: Map,
  onDelete: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  focusId: PropTypes.number,
  onFocusChange: PropTypes.func,
  onClick: PropTypes.func,
  onBlur: PropTypes.func
};

export default NoteList;
