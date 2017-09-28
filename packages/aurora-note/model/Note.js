import { convertToRaw, convertFromRaw, EditorState } from "draft-js";
import _ from "lodash";

export default class Note {
  constructor(editorState, options) {
    options = options || {}; // avoid undefined errors

    // Note that the "moveSelectionToEnd" is required to fix errors
    // that put the cursor in the front instead of at the end when clicked on.
    this.editorState = EditorState.moveSelectionToEnd(
      EditorState.createWithContent(editorState.getCurrentContent())
    );

    const now = Date.now();
    this.date = options.date ? options.date : now;
    this.id = options.id ? options.id : now;

    this.forceIdToBeString();
  }

  setEditorState(editorState) {
    this.editorState = editorState;
  }

  getRawContentState() {
    return convertToRaw(this.editorState.getCurrentContent());
  }

  forceIdToBeString = () => {
    this.id = `${this.id}`; // Force id's to be strings.
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
    this.forceIdToBeString();
    return {
      contentState: this.getRawContentState(),
      date: this.date,
      id: this.id
    };
  };

  /**
   * Returns a Note object from file data
   */
  static fromFileData(data) {
    const json = JSON.parse(data);
    const contentState = convertFromRaw(json.contentState);
    const editorState = EditorState.createWithContent(contentState);
    return new Note(editorState, {
      date: json.date,
      id: `${json.id}`
    });
  }
}
