import React from "react";
import { shallow, mount } from "enzyme";
import Feed from "../index.js";
import { EditorState, ContentState } from "draft-js";

describe("feed", () => {
  it("exists", () => {
    expect(Feed).toBeDefined();
  });

  it("has an Editor somewhere", () => {
    const wrapper = shallow(<Feed />);
    expect(wrapper.render().find(".DraftEditor-root").length).toBe(1);
  });

  it("has a note-wrapper", () => {
    const wrapper = shallow(<Feed />);
    expect(wrapper.render().find(".note-wrapper").length).toBe(1);
  });

  it("can add a card", () => {
    const text = "Hey I am some text";
    const wrapper = mount(<Feed />);
    wrapper
      .get(0)
      .addCard({
        "uuid":0, // TODO: don't actually save this stuff in tests
        "editorState":EditorState.createWithContent(ContentState.createFromText(text))
      }

      );

    expect(wrapper.containsMatchingElement(<span>{text}</span>)).toBe(true);
  });

  it("can use submit to add a card", () => {
    const text = "Hey I am some text";
    const wrapper = mount(<Feed />);
    wrapper
      .get(0)
      .onSubmit(
        EditorState.createWithContent(ContentState.createFromText(text))
      );

    expect(wrapper.containsMatchingElement(<span>{text}</span>)).toBe(true);
  });

  it("won't submit an empty card", () => {
    const wrapper = mount(<Feed />);
    wrapper.get(0).onSubmit(EditorState.createEmpty());

    // Note that `wrapper.find(".public-DraftEditor-content").length` is greater
    // than 1 if something was added.
    expect(wrapper.find(".public-DraftEditor-content").length).toBe(1);
  });
});
