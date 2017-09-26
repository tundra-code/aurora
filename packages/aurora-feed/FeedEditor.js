import React from "react";
import { Editor, modifiers } from "../aurora-editor";
import { Card } from "../aurora-ui";

const CardAtBottom = Card.extend`
  position: fixed;
  bottom: 0;
  width: 100%;
  margin-bottom: 0;
  border-top: 1px solid
    ${props => (props.theme ? props.theme.colors.border : "black")};
  .public-DraftEditorPlaceholder-inner {
    pointer-events: none;
    position: absolute;
    color: #aaaaaa;
  }
`;

class FeedEditor extends React.Component {
  constructor(props) {
    super(props);
    this._Editor = modifiers.canSubmit(Editor);
  }

  render() {
    return (
      <CardAtBottom>
        <this._Editor {...this.props} />
      </CardAtBottom>
    );
  }
}

export default FeedEditor;
