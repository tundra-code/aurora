import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Trash } from "react-feather";

const DeleteDiv = styled.div`
  float: right;
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
        <button className="delete-button" type="button" onClick={this.onDelete}>
          <Trash />
        </button>
      </DeleteDiv>
    );
  }

  onDelete() {
    const id = this.props.id;
    this.props.onDelete(id);
  }
}

DeleteButton.propTypes = {
  id: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default DeleteButton;
