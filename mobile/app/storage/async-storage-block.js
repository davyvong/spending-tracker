import Sha256 from 'utils/sha256';

export default class AsyncStorageBlock {
  constructor(name, items) {
    this.name = name || Sha256.hash(new Date().toString());
    this.items = Object.assign({}, items);
    this.size = Object.keys(this.items).length;
  }

  deleteItem(key) {
    if (this.items.hasOwnProperty(key)) {
      delete this.items[key];
      this.size--;
    }
  }

  getItem(key) {
    if (this.items.hasOwnProperty(key)) {
      return this.items[key];
    }
    return null;
  }

  setItem(key, item) {
    if (!this.items.hasOwnProperty(key)) {
      this.size++;
    }
    this.items[key] = item;
  }

  merge(block) {
    Object.assign(this.items, block.items);
  }

  toString() {
    return JSON.stringify({
      items: this.items,
      name: this.name,
    });
  }
}
