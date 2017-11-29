import React from "react";
import { connect } from "react-redux";
import { mutate } from "@react-mutate/core";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Card, Container } from "../ui";
import { Editor } from "../editor";
import {
  deleteNoteAndChangeSelection,
  updateAndSaveNote
} from "../../redux/actions";
import TagContainer from "./TagContainer";
import TagModel from "./Tag";
import _ from "lodash";

const DeleteButton = styled.button`
  float: right;
`;

const BumpedDownContainer = Container.extend`
  padding-top: ${props => props.theme.spacing.header};
  padding: 0;
`;

const NoteViewContainer = Card.extend`
  padding: 0;
`;

const TopViewContainer = styled.div`
  padding: ${props => props.theme.spacing.padding};
`;

class NoteView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tagInputValue: ""
    };
  }

  onDelete = () => {
    if (this.props.note === null) {
      return;
    }
    this.props.delete(this.props.note);
    this.setState({ tagInputValue: "" });
  };

  _getTags = () => {
    if (!this.props.note) {
      return [];
    }

    return this.props.note.tags;
  };

  onTagInputChange = event => {
    this.setState({ tagInputValue: event.target.value });
  };

  onTagSubmit = () => {
    // We need to clone because NoteModel should not be a class
    const note = _.clone(this.props.note);
    note.addTag(new TagModel(this.state.tagInputValue));
    this.props.updateAndSaveNote(note);

    // Clear text input
    this.setState({ tagInputValue: "" });
  };

  onTagDelete = tag => {
    // We need to clone because NoteModel should not be a class
    const note = _.clone(this.props.note);
    note.removeTag(tag.id);
    this.props.updateAndSaveNote(note);
  };

  render() {
    const tags = this._getTags();

    return (
      <BumpedDownContainer>
        <NoteViewContainer>
          <TopViewContainer>
            <DeleteButton onClick={this.onDelete}>Delete</DeleteButton>
            <Editor {...this.props} />
          </TopViewContainer>
          <TagContainer
            tags={tags}
            tagInputValue={this.state.tagInputValue}
            onChange={this.onTagInputChange}
            onEnterPress={this.onTagSubmit}
            onTagDelete={this.onTagDelete}
          />
        </NoteViewContainer>
      </BumpedDownContainer>
    );
  }
}

NoteView.propTypes = {
  note: PropTypes.object
};

const mapDispatchToProps = dispatch => {
  return {
    updateAndSaveNote: note => dispatch(updateAndSaveNote(note)),
    delete: note => dispatch(deleteNoteAndChangeSelection(note))
  };
};

export default connect(null, mapDispatchToProps)(mutate(NoteView, "NoteView"));
