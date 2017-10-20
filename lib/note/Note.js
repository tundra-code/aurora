import { convertToRaw, convertFromRaw, EditorState } from "draft-js";
import Attribute from "./Attribute.js";
import _ from "lodash";
import uuidv4 from "uuid/v4";

export default class Note {
  constructor(editorState, attributes, options) {
    options = options || {}; // avoid undefined errors

    // Note that the "moveSelectionToEnd" is required to fix errors
    // that put the cursor in the front instead of at the end when clicked on.
    this.editorState = EditorState.moveSelectionToEnd(
      EditorState.createWithContent(editorState.getCurrentContent())
    );

    const now = Date.now();
    this.date = options.date ? options.date : now;
    const uuid = uuidv4();
    this.uuid = options.uuid ? options.uuid : uuid;
    this.attributes = attributes;

    this.forceUUIdToBeString();
  }

  setEditorState(editorState) {
    this.editorState = editorState;
  }

  getRawContentState() {
    return convertToRaw(this.editorState.getCurrentContent());
  }

  forceUUIdToBeString = () => {
    this.uuid = `${this.uuid}`; // Force id's to be strings.
  };

  /**
   * Returns true if there's no text
   */
  isEmpty() {
    const text = this.editorState.getCurrentContent().getPlainText();
    return !text || _.trim(text).length === 0;
  }

  /**
   * Gets information we care about saving to JSON
   */
  toJSON = () => {
    this.forceUUIdToBeString();
    const attrs = [];
    this.attributes.forEach(at => {
      attrs.push(at.toJSON());
    });
    return {
      uuid: this.uuid,
      date: this.date,
      attributes: attrs,
      contentState: this.getRawContentState()
    };
  };

  /**
   * Returns a Note object from file data
   */
  static fromFileData(data) {
    const json = JSON.parse(data);
    const contentState = convertFromRaw(json.contentState);
    const editorState = EditorState.createWithContent(contentState);
    const attrs = [];
    json.attributes.forEach(at => {
      attrs.push(Attribute(at.key, at.value, at.searchable));
    });
    return new Note(editorState, attrs, {
      date: json.date,
      uuid: `${json.uuid}`
    });
  }
}
