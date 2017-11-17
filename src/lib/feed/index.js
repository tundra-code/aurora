import React from "react";
import { Editor } from "../editor";
import { Card, Container } from "../ui";
import { connect } from "react-redux";
import { mutate } from "@react-mutate/core";
import { loadNoteContent } from "../../redux/actions";
import {
  selectedNote,
  editorState,
  isLoadingContent
} from "../../redux/selectors";

const BumpedDownContainer = Container.extend`
  padding-top: ${props => props.theme.spacing.header};
`;

class Feed extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps) {
    if (this.props.selectedNote === null) {
      return;
    }
    if (this.props.selectedNote !== prevProps.selectedNote) {
      this.props.dispatch(loadNoteContent(this.props.selectedNote));
    }
  }

  render() {
    return (
      <BumpedDownContainer>
        <Card>
          <Editor
            ourEditorState={this.props.editorState}
            note={this.props.selectedNote}
            placeholder={"Change me!"}
          />
        </Card>
      </BumpedDownContainer>
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
