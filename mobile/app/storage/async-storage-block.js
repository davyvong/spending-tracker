import Sha256 from 'utils/sha256';

export default class AsyncStorageBlock {
  constructor(name, items) {
    this.name = name || Sha256.hash(new Date().toString());
    this.items = Object.assign({}, items);
    this.size = Object.keys(this.items).length;
  }

  deleteItem(key) {
    delete this.items[key];
    this.size--;
  }

  getItem(key) {
    return this.items[key] || null;
  }

  setItem(key, item) {
    this.items[key] = item;
    this.size++;
  }

  merge(block) {
    return Object.assign(this.items, block.items);
  }

  toString() {
    return JSON.stringify({
      items: this.items,
      name: this.name,
    });
  }
}
