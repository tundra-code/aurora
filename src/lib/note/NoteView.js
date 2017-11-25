import React from "react";
import { connect } from "react-redux";
import { mutate } from "@react-mutate/core";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Card, Container } from "../ui";
import { Editor } from "../editor";
import { deleteNote } from "../../redux/actions";

const DeleteButton = styled.button`
  float: right;
`;

const BumpedDownContainer = Container.extend`
  padding-top: ${props => props.theme.spacing.header};
  padding: 0;
`;

class NoteView extends React.Component {
  constructor(props) {
    super(props);
  }

  onDelete = () => {
    if (this.props.note === null) {
      return;
    }
    this.props.dispatch(deleteNote(this.props.note));
  };

  render() {
    return (
      <BumpedDownContainer>
        <Card>
          <DeleteButton onClick={this.onDelete}>Delete</DeleteButton>
          <Editor {...this.props} />
        </Card>
      </BumpedDownContainer>
    );
  }
}

NoteView.propTypes = {
  note: PropTypes.object
};

export default connect()(mutate(NoteView, "NoteView"));
