import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Plus } from "react-feather";

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
        <icon className="AddButton" type="icon" onClick={this.onSubmit}>
          <Plus />
        </icon>
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
