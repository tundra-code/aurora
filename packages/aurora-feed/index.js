import React from "react";
import { NoteModel } from "../aurora-note";
import search from "../aurora-search";
import { EditorState } from "draft-js";
import PropTypes from "prop-types";
import _ from "lodash";
import {
  fromNotesToSearchableObjects,
  addNewNoteData,
  removeNoteData
} from "./util.js";
import StatelessFeed from "./StatelessFeed";

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shownNotes: {}, // The notes that the user sees
      allNotes: {}, // A local copy of all the notes
      inputEditorState: EditorState.createEmpty()
    };

    this.props.persist.loadNotes(this.addSavedNotes);
  }

  addSavedNotes = notes => {
    notes.forEach(note => {
      this.addCard(note);
    });
  };

  // Note: This fat arrow function syntax let's us not have to `bind(this);` in the
  // constructor. See: https://facebook.github.io/react/docs/handling-events.html
  addCard = note => {
    // Don't allow a note that isn't a NoteModel
    if (!(note instanceof NoteModel)) {
      throw new Error(
        "Feed called addCard on something that isn't a NoteModel"
      );
    }

    // Don't add a note if it doesn't exist. AUR-20
    if (note.isEmpty()) {
      return;
    }

    this.setState(prevState => {
      prevState.shownNotes = addNewNoteData(prevState.shownNotes, note);
      prevState.allNotes = addNewNoteData(prevState.allNotes, note);
      return prevState;
    });
  };

  onChange = editorState => {
    this.setState({
      inputEditorState: editorState
    });
    // Only search once every XYZ miliseconds so we're not flashing
    const searchOnlyAfterSomeTime = _.debounce(this.searchCard, 250);
    searchOnlyAfterSomeTime(editorState);
  };

  searchCard = editorState => {
    this.setState(prevState => {
      const ids = search(
        fromNotesToSearchableObjects(prevState.allNotes),
        editorState.getCurrentContent().getPlainText()
      );

      const notes = ids.map(id => prevState.allNotes[id]);

      if (notes.length === 0) {
        prevState.shownNotes = Object.assign({}, prevState.allNotes); // makes a copy
        return prevState;
      }
      prevState.shownNotes = Object.assign({}, notes); // makes a copy of notes
      return prevState;
    });
  };

  onDelete = id => {
    this.props.persist.deleteNote(id);
    this.setState(prevState => {
      prevState.shownNotes = removeNoteData(prevState.shownNotes, id);
      prevState.allNotes = removeNoteData(prevState.allNotes, id);
      return prevState;
    });
  };

  onSubmit = editorState => {
    const note = new NoteModel(editorState);

    this.addCard(note);
    this.props.persist.save(note);

    // Clear the main editor's state
    this.setState({
      inputEditorState: EditorState.createEmpty()
    });
  };

  render() {
    return (
      <StatelessFeed
        notes={this.state.shownNotes}
        onSubmit={this.onSubmit}
        onChange={this.onChange}
        onDelete={this.onDelete}
        inputEditorState={this.state.inputEditorState}
      />
    );
  }
}

Feed.propTypes = {
  persist: PropTypes.shape({
    save: PropTypes.func.isRequired,
    deleteNote: PropTypes.func.isRequired,
    loadNotes: PropTypes.func.isRequired
  })
};

export default Feed;
