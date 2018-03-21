import React from "react";
import styled from "styled-components";
import { Input } from "../ui/Inputs";
import Tag from "./TagView";
import KeyCodes from "key-code";

const TagStyleContainer = styled.div`
  border-top: 1px solid ${props => props.theme.colors.border};
  width: 100%;
  padding: ${props => props.theme.spacing.padding};
`;

const onKeyPress = (event, onEnterPress) => {
  if (event.charCode !== KeyCodes.ENTER) {
    return;
  }

  onEnterPress();
};

const TagContainer = ({
  tags,
  tagInputValue,
  onEnterPress,
  onChange,
  onTagDelete
}) => (
  <TagStyleContainer>
    <Input
      placeholder={"Press enter to add a tag"}
      value={tagInputValue}
      onChange={onChange}
      onKeyPress={event => {
        onKeyPress(event, onEnterPress);
      }}
    />
    {tags.map(tag => (
      <Tag
        text={tag.value}
        key={`${tag.id}-tag`}
        onDelete={() => {
          onTagDelete(tag);
        }}
      />
    ))}
  </TagStyleContainer>
);

export default TagContainer;
