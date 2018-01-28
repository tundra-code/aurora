import uuidv4 from "uuid/v4";

export default class Tag {
  constructor(value, options) {
    options = options || {}; // avoid undefined errors
    this.value = value;
    this.id = options.id;
    const uuid = uuidv4();
    this.uuid = options.uuid ? options.uuid : uuid;
  }
}
