import React from "react";
import Note from "../aurora-note";
import FeedEditor from "./FeedEditor.js";
import search from "../aurora-search";
import styled from "styled-components";
import { EditorState } from "draft-js";
import { save, loadNotes, deleteNote } from "../aurora-file-io";
import _ from "lodash";

/**
 * Adds a "text" version of the editor state to each note in the notes object
 */
const fromNotesToSearchableObjects = notes => {
  const uuids = Object.keys(notes);
  return uuids.map(uuid => {
    return {
      text: notes[uuid].editorState.getCurrentContent().getPlainText(),
      uuid: uuid
    };
  });
};

/**
 * Creates data that we can use for a Note
 * @param {EditorState} editorState
 */
const addNewNoteData = (notes, note) => {
  notes[note["uuid"]] = note;
  return notes;
};

const removeNoteData = (notes, uuid) => {
  delete notes[uuid];
  return notes;
};

const FlexSeperated = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
`;

const NoteWrapper = styled.div`
  width: 100%;
  padding-bottom: 50px;
`;

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shownNotes: {}, // The notes that the user sees
      allNotes: {}, // A local copy of all the notes
      inputEditorState: EditorState.createEmpty()
    };

    this.addCard = this.addCard.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.searchCard = this.searchCard.bind(this);
    this.addSavedNotes = this.addSavedNotes.bind(this);
    this.onDelete = this.onDelete.bind(this);
    loadNotes(this.addSavedNotes);
  }

  addSavedNotes(notes) {
    notes.forEach(note => {
      this.addCard(note);
    });
  }

  addCard(note) {
    // Don't add a note if it doesn't exist. AUR-20
    const text = note["editorState"].getCurrentContent().getPlainText();
    if (!text || _.trim(text).length === 0) {
      return;
    }

    this.setState(prevState => {
      prevState.shownNotes = addNewNoteData(prevState.shownNotes, note);
      prevState.allNotes = addNewNoteData(prevState.allNotes, note);
      return prevState;
    });
  }

  onChange(editorState) {
    this.setState({
      inputEditorState: editorState
    });
    this.searchCard(editorState);
  }

  searchCard(editorState) {
    this.setState(prevState => {
      const uuids = search(
        fromNotesToSearchableObjects(prevState.allNotes),
        editorState.getCurrentContent().getPlainText()
      );

      const notes = uuids.map(uuid => prevState.allNotes[uuid]);

      if (notes.length === 0) {
        prevState.shownNotes = Object.assign({}, prevState.allNotes); // makes a copy
        return prevState;
      }
      prevState.shownNotes = Object.assign({}, notes); // makes a copy of notes
      return prevState;
    });
  }

  onDelete(uuid) {
    deleteNote(uuid);
    this.setState(prevState => {
      prevState.shownNotes = removeNoteData(prevState.shownNotes, uuid);
      prevState.allNotes = removeNoteData(prevState.allNotes, uuid);
      return prevState;
    });
  }

  onSubmit(editorState) {
    // Add a card with a copy of the editor state
    let uuid = save(editorState);
    this.addCard({
      "editorState":editorState,
      "uuid":uuid
    });

    // Clear the main editor's state
    this.setState({
      inputEditorState: EditorState.createEmpty()
    });
  }

  render() {
    // Create a note for each uuid
    const uuids = Object.keys(this.state.shownNotes);
    console.log(uuids);
    const notes = uuids.map(uuid => {
      return (
        <Note
          uuid={uuid}
          key={uuid}
          defaultEditorState={this.state.shownNotes[uuid].editorState}
          onDelete={this.onDelete}
        />
      );
    });

    return (
      <FlexSeperated className="flex-seperated">
        <NoteWrapper className="note-wrapper">{notes}</NoteWrapper>
        <FeedEditor
          className="card-at-bottom-editor"
          onSubmit={this.onSubmit}
          onChange={this.onChange}
          editorState={this.state.inputEditorState}
          focused
        />
      </FlexSeperated>
    );
  }
}

export default Feed;
