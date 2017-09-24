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

const FeedEditor = props => {
  const { canSubmit } = modifiers;
  const _Editor = canSubmit(Editor);
  return (
    <CardAtBottom>
      <_Editor {...props} />
    </CardAtBottom>
  );
};

export default FeedEditor;
