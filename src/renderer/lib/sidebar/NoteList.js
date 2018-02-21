import React from "react";
import { connect } from "react-redux";
import { loadNotes } from "../../redux/actions";
import NoteListItem from "./NoteListItem.js";
import { MenuCardList } from "../ui/Menu";
import { allNotes, query } from "../../redux/selectors";
import { noteDictToArray } from "../note/util";

class NoteList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(loadNotes());
  }

  filterNotesBasedOnQuery = note => {
    const searchTags = this.props.query.split(" ");
    const noteTags = note.getTags();
    for (const tag of searchTags) {
      const trimmedTag = tag.trim().replace(/\W/g, ""); // remove alphanumeric
      const matchingTags = noteTags.filter(t =>
        t.value.toLowerCase().includes(trimmedTag.toLowerCase())
      );
      if (matchingTags.length === 0) {
        return false;
      }
    }
    return true;
  };

  render() {
    let noteObjectList = noteDictToArray(this.props.allNotes);
    if (this.props.query.length !== 0) {
      noteObjectList = noteObjectList.filter(this.filterNotesBasedOnQuery);
    }
    const noteList = noteObjectList.map(note => (
      <NoteListItem key={note.uuid} note={note} />
    ));

    return (
      <div>
        <MenuCardList> {noteList} </MenuCardList>
      </div>
    );
  }
}

NoteList.propTypes = {};

const mapStateToProps = state => {
  return {
    allNotes: allNotes(state),
    query: query(state)
  };
};

export default connect(mapStateToProps)(NoteList);
