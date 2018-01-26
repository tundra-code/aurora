import Tag from "./Tag.js";
import _ from "lodash";
import uuidv4 from "uuid/v4";
import { loadNoteContent } from "../io";
import { renderPreview as renderPre } from "../preview";
import { emptySerializedEditorState } from "../editor/util";

export default class Note {
  /**
   * @param content Draft js content
   * @param mutationName String
   * @param tags array
   * @param options object
   */
  constructor(content, mutationName, tags, options) {
    options = options || {}; // avoid undefined errors

    const cont = {};
    cont[mutationName] = content;
    this.content = cont;
    this.mutationName = mutationName;

    const uuid = uuidv4();
    this.uuid = options.uuid ? options.uuid : uuid;
    this.id = options.id; //sqlite id
    this.created_at = options.created_at;
    this.updated_at = options.updated_at;
    this.preview = options.preview ? options.preview : { text: "New Note" };
    this.tags = tags;

    this.forceUUIdToBeString();
  }

  addTag = tag => {
    this.tags.push(tag);
  };

  removeTag = id => {
    const index = this.tags.findIndex(tag => {
      return tag.id === id;
    });
    if (index !== -1) {
      this.tags.splice(index, 1);
    }
  };

  loadContent = (callback, onFailure) => {
    loadNoteContent(
      this,
      data => {
        if (data) {
          this.content = JSON.parse(data);
        } else {
          this.setContent(emptySerializedEditorState());
        }

        callback(this.content);
      },
      onFailure
    );
  };

  getContent = () => {
    return new Promise((resolve, reject) => {
      if (this.content[this.mutationName] === null) {
        this.loadContent(resolve, reject);
      } else {
        resolve(this.content);
      }
    });
  };

  setPreview = serializedPreview => {
    this.preview = Object.assign({}, serializedPreview);
  };

  getPreview = () => {
    return this.preview;
  };

  renderPreview = () => {
    return renderPre(this.preview);
  };

  setContent = serializedState => {
    const cont = {};
    cont[this.mutationName] = serializedState;
    this.content = cont;
    return this.content;
  };

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
   * Returns a Note object from file data
   */
  static fromDBData(data) {
    const json = data.toJSON();
    const tags = [];
    json.tag.forEach(t => {
      tags.push(new Tag(t.value, { id: t.id }));
    });
    const mutationName = json.mutationName;
    return new Note(null, mutationName, tags, {
      uuid: `${json.uuid}`,
      id: json.id,
      created_at: json.created_at,
      updated_at: json.updated_at,
      preview: JSON.parse(json.preview)
    });
  }
}
