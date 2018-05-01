import React from "react";
import { connect } from "react-redux";
import { loadNotes } from "../../redux/actions";
import NoteListItem from "./NoteListItem.js";
import { MenuCardList } from "../ui/Menu";
import { allNotes, query } from "../../redux/selectors";
import { noteDictToArray } from "../note/util";
import styled from "styled-components";

const Container = styled.div`
  overflow-y: auto;
  flex: 2;
`;

class NoteList extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch(loadNotes());
  }

  getMatchingTags = (tag, noteTags) => {
    const trimmedTag = tag.trim().replace(/\W/g, ""); // remove alphanumeric
    const matchingTags = noteTags.filter(t =>
      t.value.toLowerCase().includes(trimmedTag.toLowerCase())
    );
    return matchingTags;
  };

  removeDuplicateTags = matchingTags => {
    const uniqueMatchingTags = {};
    for (const tags of matchingTags) {
      for (const t of tags) {
        uniqueMatchingTags[t.value] = true;
      }
    }
    return Object.keys(uniqueMatchingTags);
  };

  filterNotesBasedOnQuery = note => {
    const searchTags = this.props.query.trim().split(" ");
    const noteTags = note.getTags();
    const allMatchingTags = [];
    for (const tag of searchTags) {
      allMatchingTags.push(this.getMatchingTags(tag, noteTags));
    }
    return this.removeDuplicateTags(allMatchingTags);
  };

  sortFilteredNoteList = (noteList, matchingTagsDict) => {
    return noteList.sort((a, b) => {
      return matchingTagsDict[a.uuid].length < matchingTagsDict[b.uuid].length;
    });
  };

  render() {
    let noteObjectList = noteDictToArray(this.props.allNotes);
    const matchingTagsDict = {};
    if (this.props.query.length !== 0) {
      const filteredNoteList = [];
      for (const note of noteObjectList) {
        const matchingTags = this.filterNotesBasedOnQuery(note);
        if (matchingTags.length > 0) {
          filteredNoteList.push(note);
          matchingTagsDict[note.uuid] = matchingTags;
        }
      }

      noteObjectList = this.sortFilteredNoteList(
        filteredNoteList,
        matchingTagsDict
      );
    }

    const noteList = noteObjectList.map(note => (
      <NoteListItem
        key={note.uuid}
        note={note}
        matchingTags={matchingTagsDict[note.uuid]}
      />
    ));

    return (
      <Container>
        <MenuCardList> {noteList} </MenuCardList>
      </Container>
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
