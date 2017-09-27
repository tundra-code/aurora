import React from "react";
import NoteView from "../Note.js";
import { EditorState, ContentState } from "draft-js";
import { mount } from "enzyme";
import sinon from "sinon";

describe("note", () => {
  it("should render a delete button and we can click it", () => {
    const fakeDeleteFunc = sinon.spy();

    const wrapper = mount(
      <NoteView
        defaultEditorState={EditorState.createWithContent(
          ContentState.createFromText("Hey I am some content")
        )}
        id={"1"}
        onDelete={fakeDeleteFunc}
        onBlur={() => {}}
        onUpdate={() => {}}
      />
    );

    // We have a delete button
    expect(wrapper.find(".delete-button").length).toBe(1);

    // Do a sanity check to make sure we somehow haven't already called the delete button
    // Before we clicked on anything
    expect(fakeDeleteFunc.called).toBe(false);

    // Let's click the delete button
    wrapper.find(".delete-button").simulate("click");

    // Now let's check that we actually called the onDelete event
    expect(fakeDeleteFunc.called).toBe(true);
  });
});
