import React from "react";
import { connect } from "react-redux";
import { mutate } from "@react-mutate/core";
import styled from "styled-components";
import PropTypes from "prop-types";
import ContentView from "./ContentView";
import { Card, Container } from "../ui";
import {
  updateAndSaveNote,
  setEditorState,
  updateNote,
  selectNote,
  deleteNote,
  saveNote
} from "../../redux/actions";
import TagContainer from "./TagContainer";
import TagModel from "../note/Tag";
import { getDefaultKeyBinding, KeyBindingUtil } from "draft-js";
import Toolbar from "./Toolbar";
import moment from "moment";
import Analytics from 'electron-google-analytics';

const analytics = new Analytics('UA-117599866-1');


const DeleteButton = styled.button`
  float: right;
  background: transparent;
  border: none;
  position: relative;
  top: -${props => 2 * props.theme.spacing.padding};
  font-size: ${props => props.theme.fontSize};
`;

const InsetText = styled.div`
  color: ${props => props.theme.colors.insetText};
`;

const SavedAtDiv = InsetText.extend`
  padding: ${props => props.theme.spacing.padding};
`;

const BumpedDownContainer = Container.extend`
  padding-top: ${props => props.theme.spacing.header};
  padding: 0;
`;

const NoteViewContainer = Card.extend`
  padding: 0;
  position: relative;
  z-index: 0;
`;

const TopViewContainer = styled.div`
  padding: ${props => props.theme.spacing.padding};
`;

const TopBarContainer = styled.div`
  display: grid;
  grid-template-columns: auto 50px;
`;

const { hasCommandModifier } = KeyBindingUtil;

class NoteView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tagInputValue: "",
      focused: false,
      toolbarCommand: null
    };
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.note &&
      this.props.note &&
      prevProps.note.uuid !== this.props.note.uuid
    ) {
      this.setState({ tagInputValue: "" });
    }
  }

  onDelete = () => {
    if (this.props.note === null) {
      return;
    }
    if (window.confirm("Are you sure you want to delete this note?")) {
      this.props.delete(this.props.note);
      this.setState({ tagInputValue: "" });
      this.removeNote(this.props.note);
    }
    return analytics.event('Button', 'delete', { evLabel: 'delete', evValue: 1,clientID:window.clientID})
  .then((response) => {
    return response;
  }).catch((err) => {
    return err;
  });
  };

  _getTags = () => {
    if (!this.props.note) {
      return [];
    }

    return this.props.note.getTags();
  };

  onTagInputChange = event => {
    this.setState({ tagInputValue: event.target.value });
  };

  onTagSubmit = () => {
    if (this.state.tagInputValue === "") {
      return;
    }
    const note = this.props.note;
    note.addTag(new TagModel(this.state.tagInputValue));
    this.props.updateAndSaveNote(note);

    // Clear text input
    this.setState({ tagInputValue: "" });

    return analytics.event('Tag', 'add', { evLabel: "add tag", evValue: 1, clientID:window.clientID})
      .then((response) => {
        console.log(response);
        return response;
      }).catch((err) => {
        return err;
      });
  };

  onTagDelete = tag => {
    const note = this.props.note;
    note.removeTag(tag.uuid);
    this.props.updateAndSaveNote(note);

    return analytics.event('Tag', 'delete', { evLabel: "delete tag", evValue: 1,clientID:window.clientID})
      .then((response) => {
        return response;
      }).catch((err) => {
        return err;
      });
  };

  removeNote = note => {
    this.props.dispatch(deleteNote(note));
    this.props.dispatch(selectNote(null));
  };

  onEditorChange = (
    editorState,
    serializedContent,
    serializedPreview,
    searchableText,
    save = false
  ) => {
    const note = this.props.note;
    this.props.dispatch(setEditorState(editorState));

    if (this.state.focused || save) {
      if (serializedContent) {
        note.setContent(serializedContent);
      }
      if (serializedPreview) {
        note.setPreview(serializedPreview);
      }
      if (searchableText) {
        note.searchableText = searchableText;
      }
      // see if we should save after updating.
      if (save) {
        this.props.dispatch(updateAndSaveNote(note));
      } else {
        this.props.dispatch(updateNote(note));
      }
    }
  };

  onEditorContentLoaded = editorState => {
    this.props.dispatch(setEditorState(editorState));
  };

  checkAndSaveNote = () => {
    const note = this.props.note;
    if (note === null) {
      return;
    }
    this.props.dispatch(saveNote(note));
  };

  saveKeyBinding = e => {
    if (e.keyCode === 83 && hasCommandModifier(e)) {
      return "save-note";
    }
    return getDefaultKeyBinding(e);
  };

  handleKeyCommand = command => {
    if (command === "save-note") {
      this.checkAndSaveNote();
      return "handled";
    }
    return "not-handled";
  };

  onEditorBlur = () => {
    this.setState({ focused: false }, () => {
      this.checkAndSaveNote();
    });
  };

  onEditorFocus = () => {
    this.setState({ focused: true });
  };

  toolbarOnClick = (command, event) => {
    event.preventDefault(); // prevent de-focus of editor
    this.setState({ toolbarCommand: command });
  };

  toolbarOnClickRelease = () => {
    this.setState({ toolbarCommand: null });
  };

  render() {
    if (this.props.note === null) {
      return (
        <InsetText>Create new note or select note from sidebar.</InsetText>
      );
    }

    const tags = this._getTags();
    const savedAt = moment(this.props.note.updated_at).format(
      "M/D/YY hh:mm:ss a"
    );

    return (
      <BumpedDownContainer>
        <NoteViewContainer active={this.state.focused}>
          <TopViewContainer>
            <TopBarContainer>
              <Toolbar
                onClick={this.toolbarOnClick}
                onClickRelease={this.toolbarOnClickRelease}
                noteType={this.props.note.mutationName}
              />
              <DeleteButton onClick={this.onDelete}>🗑</DeleteButton>
            </TopBarContainer>
            <ContentView
              isLoadingContent={this.props.isLoadingContent}
              ourEditorState={this.props.ourEditorState}
              note={this.props.note}
              onChange={this.onEditorChange}
              onBlur={this.onEditorBlur}
              onContentLoaded={this.onEditorContentLoaded}
              onFocus={this.onEditorFocus}
              keyBindingFn={this.saveKeyBinding}
              handleKeyCommand={this.handleKeyCommand}
              simulatedKeyCommand={this.state.toolbarCommand}
            />
            <SavedAtDiv>Last saved at {savedAt}</SavedAtDiv>
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

window.toolbar = {
  buttons: [],
  toggleButtons: []
};
window.toolbar.buttons.push({
  icon: "💾",
  command: "save-note",
  hint: "save"
});

NoteView.propTypes = {
  note: PropTypes.object
};

const mapDispatchToProps = dispatch => {
  return {
    updateAndSaveNote: note => dispatch(updateAndSaveNote(note)),
    delete: note => dispatch(deleteNote(note))
  };
};

export default connect(null, mapDispatchToProps)(mutate(NoteView, "NoteView"));
