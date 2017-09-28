import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const AddDiv = styled.div`
  float: right;
  width: 20%;
`;

class AddButton extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  render() {
    return (
      <AddDiv>
        <button className="add-button" type="button" onClick={this.onSubmit}>
          Add
        </button>
      </AddDiv>
    );
  }

  onSubmit() {
    const editorState = this.props.editorState;
    this.props.onSubmit(editorState);
  }
}

AddButton.propTypes = {
  editorState: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default AddButton;
