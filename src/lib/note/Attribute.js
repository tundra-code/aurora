export default class Attribute {
  constructor(key, value, searchable, options) {
    options = options || {}; // avoid undefined errors
    this.key = key;
    this.value = value;
    this.searchable = searchable || false;
    this.id = options.id;
  }
}
