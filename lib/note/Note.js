import Attribute from "./Attribute.js";
import _ from "lodash";
import uuidv4 from "uuid/v4";
import { loadNoteContent } from "../io";

export default class Note {
  constructor(content, mutationName, attributes, options) {
    options = options || {}; // avoid undefined errors

    const uuid = uuidv4();
    this.uuid = options.uuid ? options.uuid : uuid;
    this.id = options.id;
    this.attributes = attributes;

    const cont = {};
    cont[mutationName] = content;
    this.content = cont;
    this.mutationName = mutationName;

    this.forceUUIdToBeString();
  }

  loadContent = () => {
    this.content[this.mutationName] = loadNoteContent(this);
  };

  getContent = () => {
    if (this.content[this.mutationName] === null) {
      this.loadContent();
    }
    return this.content[this.mutationName];
  };

  setContent = content => {
    this.content[this.mutationName] = content;
  };

  forceUUIdToBeString = () => {
    this.uuid = `${this.uuid}`; // Force id's to be strings.
    //this.uuid = String(this.uuid);
  };

  /**
   * Returns true if there's no text
   */
  isEmpty() {
    const text = this.editorState.getCurrentContent().getPlainText();
    return !text || _.trim(text).length === 0;
  }

  /**
   * Returns a Note object from file data
   */
  static fromDBData(data) {
    const json = data.toJSON();
    const attrs = [];
    json.attribute.forEach(at => {
      attrs.push(new Attribute(at.key, at.value, at.searchable));
    });
    const mutationName = json.mutationName;
    return new Note(null, mutationName, attrs, {
      uuid: `${json.uuid}`,
      id: json.id
    });
  }
}
