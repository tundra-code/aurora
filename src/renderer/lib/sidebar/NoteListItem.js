import React from "react";
import PropTypes from "prop-types";
import { selectAndLoadNote } from "../../redux/actions";
import { connect } from "react-redux";
import { MenuCard } from "../ui/Menu";
import { selectedNote } from "../../redux/selectors";

class NoteListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  onClick = () => {
    this.props.dispatch(selectAndLoadNote(this.props.note));
  };

  render() {
    const isActive =
      this.props.selectedNote &&
      this.props.selectedNote.uuid === this.props.note.uuid;

    const preview = this.props.note.renderPreview();
    return (
      <MenuCard
        onClick={this.onClick}
        key={`${this.props.note.uuid}-note`}
        active={isActive}>
        {preview}
      </MenuCard>
    );
  }
}

NoteListItem.propTypes = {
  note: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    selectedNote: selectedNote(state)
  };
};

export default connect(mapStateToProps)(NoteListItem);
