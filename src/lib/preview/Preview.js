import React from "react";
import PropTypes from "prop-types";
import "draft-js/dist/Draft.css";
import { mutate } from "@react-mutate/core";
import styled from "styled-components";

const PreviewDiv = styled.div`
  text-align: center;
  border: 1px solid black;
  padding: 5px;
  margin: 10px;
  border-radius: 10px;
`;

/**
 * A Preview react component. Previews a note.
 */
class Preview extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <PreviewDiv>
        <p>{this.props.note.uuid}</p>
      </PreviewDiv>
    );
  }
}

Preview.propTypes = {
  note: PropTypes.object.isRequired
};

export default mutate(Preview, "Preview");
