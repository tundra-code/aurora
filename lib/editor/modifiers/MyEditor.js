import React from "react";
import PropTypes from "prop-types";
import { StatelessEditor } from "../editor";

class myEditor extends StatelessEditor {
  onSubmit()=>{
    //save note
    //make sure next line down exists, like the props part
    this.props.onSubmit(this.props.note);
  }

  render()
    return <StatelessEditor
      onSubmit={this.onSubmit}
      {this...props}
      />
}


StatelessEditor.propTypes = {
  editorState: PropTypes.object.isRequired,
  focused: PropTypes.bool
};
