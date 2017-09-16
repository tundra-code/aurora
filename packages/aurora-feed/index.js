import React from "react";
import { Card } from "../aurora-ui";
import { CardAtBottomEditor } from "../aurora-editor";
import search from "../aurora-search";
import styled from "styled-components";
import _ from "lodash";

const TUTORIAL_MESSAGES = [{ text: "Press Shift+Enter to add a new note." }];

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
      messages: TUTORIAL_MESSAGES,
      allMessages: TUTORIAL_MESSAGES
    };

    this.addCard = this.addCard.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.searchCard = this.searchCard.bind(this);
  }

  addCard(text) {
    // Don't add a note if it doesn't exist. AUR-20
    if (!text || _.trim(text).length === 0) {
      return;
    }

    this.setState(prevState => {
      const note = { text };
      prevState.messages.push(note);
      prevState.allMessages.push(note);

      return prevState;
    });
  }

  searchCard(text) {
    this.setState(prevState => {
      const notes = search(prevState.allMessages, text);
      if (notes.length === 0) {
        prevState.messages = prevState.allMessages.slice();
        return;
      }

      prevState.messages = notes.slice();
    });
  }

  onSubmit(text) {
    this.addCard(text);
  }

  render() {
    const cards = this.state.messages.map((note, index) => (
      <Card key={index} expanded>
        {note.text}
      </Card>
    ));

    return (
      <FlexSeperated className="flex-seperated">
        <NoteWrapper className="note-wrapper">{cards}</NoteWrapper>
        <CardAtBottomEditor
          className="card-at-bottom-editor"
          onSubmit={this.onSubmit}
          onChange={this.searchCard}
        />
      </FlexSeperated>
    );
  }
}

export default Feed;
