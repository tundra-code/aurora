import React from "react";
import { Card } from "../aurora-ui";
import { CardAtBottomEditor } from "../aurora-editor";
import search from "../aurora-search";

const TUTORIAL_MESSAGES = [{ text: "Press Shift+Enter to add a new note." }];

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
      <Card key={index}> {note.text} </Card>
    ));

    return (
      <div>
        {cards}
        <CardAtBottomEditor
          onSubmit={this.onSubmit}
          onChange={this.searchCard}
        />
      </div>
    );
  }
}

export default Feed;
