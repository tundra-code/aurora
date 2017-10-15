export default class Attribute {
  constructor(key, value, searchable) {
    this.key = key;
    this.value = value;
    this.searchable = searchable || false;
  }

  /**
   * Gets information we care about saving to JSON
   */
  toJSON = () => {
    return {
      key: this.key,
      value: this.value,
      searchable: this.searchable
    };
  };
}
