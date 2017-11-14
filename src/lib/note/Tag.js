export default class Tag {
  constructor(value, options) {
    options = options || {}; // avoid undefined errors
    this.value = value;
    this.id = options.id;
  }
}
