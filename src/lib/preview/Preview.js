import React from "react";
import PropTypes from "prop-types";
import "draft-js/dist/Draft.css";
import { mutate } from "@react-mutate/core";

/**
 * A Preview react component. Previews a note.
 */
class Preview extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <p>{this.props.preview.text}</p>
    );
  }
}

Preview.propTypes = {
  preview: PropTypes.object.isRequired
};

export default mutate(Preview, "Preview");
