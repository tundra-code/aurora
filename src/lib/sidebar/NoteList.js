import React from "react";
import { connect } from "react-redux";
import { loadNotes } from "../../redux/actions";
import NoteListItem from "./NoteListItem.js";

class NoteList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(loadNotes());
  }

  // componentDidUpdate(prevProps) {
  //   console.log(this.props.allNotes);
  // }

  render() {
    const noteList = [];
    for (const uuid in this.props.allNotes) {
      const note = this.props.allNotes[uuid];
      noteList.push(<NoteListItem key={note.uuid} note={note} />);
    }

    return <div>{noteList}</div>;
  }
}

NoteList.propTypes = {};

const mapStateToProps = state => {
  return { allNotes: state.notes.allNotes };
};

export default connect(mapStateToProps)(NoteList);
