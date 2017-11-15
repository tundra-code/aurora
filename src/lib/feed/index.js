import React from "react";
import { Editor } from "../editor";
import { Card, Container } from "../ui";
import { connect } from "react-redux";
import { mutate } from "@react-mutate/core";
import { loadNoteContent } from "../../redux/actions";

class Feed extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedNote !== prevProps.selectedNote) {
      this.props.dispatch(loadNoteContent(this.props.selectedNote));
    }
  }

  render() {
    return (
      <Container>
        <Card>
          <Editor
            editorState={this.props.editorState}
            placeholder={"Change me!"}
          />
        </Card>
      </Container>
    );
  }
}

Feed.propTypes = {};

const mapStateToProps = state => {
  return {
    selectedNote: state.notes.selectedNote,
    editorState: state.notes.editorState,
    isLoadingContent: state.notes.isLoadingContent
  };
};

export default connect(mapStateToProps)(mutate(Feed, "Feed"));
