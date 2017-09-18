import React from "react";
import styled from "styled-components";

const DeleteDiv = styled.div`
  float:right;
  width: 20%;
`;

class DeleteButton extends React.Component {
  render() {
    return (
      <DeleteDiv>
        Delete
      </DeleteDiv>
    );
  }
}

export default DeleteButton;
