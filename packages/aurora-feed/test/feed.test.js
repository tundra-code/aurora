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
      .addCard(
        EditorState.createWithContent(ContentState.createFromText(text))
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
});
