import React from "react";
import PropTypes from "prop-types";
import "draft-js/dist/Draft.css";
import { mutate } from "@react-mutate/core";
import { Card } from "../ui";

/**
 * A Preview react component. Previews a note.
 */
class Preview extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Card>
        <p>{this.props.note.uuid}</p>
      </Card>
    );
  }
}

Preview.propTypes = {
  note: PropTypes.object.isRequired
};

export default mutate(Preview, "Preview");
