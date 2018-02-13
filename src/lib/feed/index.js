import React from "react";
import { connect } from "react-redux";
import { mutate } from "@react-mutate/core";
import {
  selectedNote,
  editorState,
  isLoadingContent
} from "../../redux/selectors";
import { NoteView } from "../noteView";
import styled from "styled-components";
import { selectNote, newNote } from "../../redux/actions";
import { Container } from "../ui";
import { NoteModel } from "../note";

const AddButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

const AddButton = styled.a`
  cursor: pointer;
  color: ${props => props.theme.colors.darkPrimary};
  padding: ${props => props.theme.spacing.padding};
  user-select: none;

  &:hover {
    color: ${props => props.theme.colors.primary};
    text-decoration: underline;
  }
`;

class Feed extends React.Component {
  constructor(props) {
    super(props);
  }

  onAdd = () => {
    // Display to user options of different editor types
    console.log(Object.keys(window.editors));

    // Then create a note with the selected editor name.
    const note = this.newNote("BaseEditor");
    this.props.dispatch(newNote(note));
    this.props.dispatch(selectNote(note));
  };

  newNote = mutationName => {
    return new NoteModel(
      window.editors[mutationName].emptySerializedEditorState,
      mutationName,
      []
    );
  };

  handleOnChange = event => {
    console.log(event.target.value);
    const note = this.newNote(event.target.value);
    this.props.dispatch(newNote(note));
    this.props.dispatch(selectNote(note));
    event.target.value = "";
  };

  render() {
    return (
      <Container>
        <AddButtonContainer>
          <select onChange={this.handleOnChange}>
            <option value="" selected disabled hidden>New Note</option>
            {Object.keys(window.editors).map((t,i) => <option key={i} value={t}>{t}</option>)}
          </select>
        </AddButtonContainer>
        <NoteView
          ourEditorState={this.props.editorState}
          note={this.props.selectedNote}
          placeholder={"Change me!"}
          {...this.props}
        />
      </Container>
    );
  }
}

Feed.propTypes = {};

const mapStateToProps = state => {
  return {
    selectedNote: selectedNote(state),
    editorState: editorState(state),
    isLoadingContent: isLoadingContent(state)
  };
};

export default connect(mapStateToProps)(mutate(Feed, "Feed"));
