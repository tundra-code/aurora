import Attribute from "./Attribute.js";
import _ from "lodash";
import uuidv4 from "uuid/v4";

export default class Note {
  constructor(content, mutationName, attributes, options) {
    options = options || {}; // avoid undefined errors

    const uuid = uuidv4();
    this.uuid = options.uuid ? options.uuid : uuid;
    this.attributes = attributes;

    const cont = {};
    cont[mutationName] = content;
    this.content = cont;

    this.forceUUIdToBeString();
  }

  setContent(content) {
    this.content[this.mutationName] = content;
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
      attributes: attrs,
      content: this.content
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
    const mutationName = Object.keys(json.content)[0];
    return new Note(json.content[mutationName], mutationName, {
      uuid: `${json.uuid}`
    });
  }
}
