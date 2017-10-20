import Attribute from "./Attribute.js";
import _ from "lodash";
import uuidv4 from "uuid/v4";
import { EditorSerializer } from "../editor";

export default class Note {
  constructor(content, editorSerializer, attributes, options) {
    options = options || {}; // avoid undefined errors

    const now = Date.now();
    this.date = options.date ? options.date : now;
    const uuid = uuidv4();
    this.uuid = options.uuid ? options.uuid : uuid;
    this.attributes = attributes;
    this.editorSerializer = editorSerializer;
    this.content = content;

    this.forceUUIdToBeString();
  }

  setContent(content) {
    this.content = content;
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
      editor: "BasicEditor", // TODO: save type of editor being used
      content: this.editorSerializer.serialize(this.content)
    };
  };

  /**
   * Returns a Note object from file data
   */
  static fromFileData(data) {
    const json = JSON.parse(data);
    const attrs = [];
    json.attributes.forEach(at => {
      attrs.push(Attribute(at.key, at.value, at.searchable));
    });
    const content = EditorSerializer.deSerialize(json.content); // TODO: use the saved editor type here
    return new Note(content, EditorSerializer, {
      date: json.date,
      uuid: `${json.uuid}`
    });
  }
}
