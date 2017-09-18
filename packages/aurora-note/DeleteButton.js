import React from "react";
import styled from "styled-components";

const DeleteDiv = styled.div`
  float:right;
  width: 20%;
`;

class DeleteButton extends React.Component {

  constructor(props) {
    super(props);
    this.onDelete = this.onDelete.bind(this);
  }

  render() {
    return (
      <DeleteDiv>
        <button type="button" onClick={this.onDelete}>Delete</button>
      </DeleteDiv>
    );
  }

  onDelete() {
    let uuid = this.props.uuid;
    this.props.onDelete(uuid);
  }
}

export default DeleteButton;
