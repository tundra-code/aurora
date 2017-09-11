import React from "react";
import { Card } from "../aurora-ui";
import Editor from "./Editor.js";
import PropTypes from "prop-types";

const CardAtBottom = Card.extend`
  position: fixed;
  bottom: 0;
  width: 100%;
  margin-bottom: 0;
`;

/**
 * Basically an editor wrapped in a card at the bottom of the page.
 */
const CardAtBottomAtEditor = ({ onSubmit, onChange }) => {
  return (
    <CardAtBottom>
      <Editor onSubmit={onSubmit} onChange={onChange} />
    </CardAtBottom>
  );
};

CardAtBottomAtEditor.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired
};

export default CardAtBottomAtEditor;
