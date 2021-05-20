import RNAsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorageBlock from 'storage/async-storage-block';

export default class AsyncStorageManager {
  static namespace = 'async-storage-manager';
  static maxBlockSize = 100;

  constructor() {
    this.currentBlock = new AsyncStorageBlock();
    this.keyBlockMap = {};
    this.writeBuffer = {};
  }

  async rehydrate() {
    let stateData = await RNAsyncStorage.getItem(AsyncStorageManager.namespace);
    if (stateData) {
      stateData = JSON.parse(stateData);
      this.currentBlock = await this.getBlock(stateData.currentBlock);
      this.keyBlockMap = stateData.keyBlockMap;
      this.writeBuffer = stateData.writeBuffer;
    }
  }

  async persist() {
    return RNAsyncStorage.setItem(
      AsyncStorageManager.namespace,
      JSON.stringify({
        currentBlock: this.currentBlock.name,
        keyBlockMap: this.keyBlockMap,
        writeBuffer: this.writeBuffer,
      }),
    );
  }

  get bufferSize() {
    return Object.keys(this.writeBuffer).length;
  }

  flush() {
    if (this.bufferSize > 0) {
      const buffer = this.writeBuffer;
      this.writeBuffer = {};
      for (const blockName in buffer) {
        const block = buffer[blockName];
        console.log(`Writing ${block.name} with ${block.size} items`);
        const returnToBuffer = () => this.setBlock(block);
        RNAsyncStorage.setItem(block.name, block.toString()).catch(returnToBuffer);
      }
      this.persist();
    }
  }

  async getBlock(name) {
    let blockData = await RNAsyncStorage.getItem(name);
    blockData = JSON.parse(blockData);
    if (!blockData) {
      return null;
    }
    return new AsyncStorageBlock(blockData.name, blockData.items);
  }

  async setBlock(block) {
    if (this.writeBuffer[block.name]) {
      this.writeBuffer[block.name].merge(block);
    } else {
      this.writeBuffer[block.name] = block;
    }
    return this.writeBuffer[block.name];
  }

  async deleteItem(key) {
    const blockName = this.keyBlockMap[key];
    if (blockName) {
      const block = await this.getBlock(blockName);
      if (block) {
        delete this.keyBlockMap[key];
        block.deleteItem(key);
        return this.setBlock(block);
      }
    }
  }

  async getItem(key) {
    const blockName = this.keyBlockMap[key];
    if (!blockName) {
      return null;
    }
    if (this.currentBlock.name === blockName) {
      return this.currentBlock.getItem(key);
    }
    let block = await this.getBlock(blockName);
    if (!block) {
      return null;
    }
    block = JSON.parse(block) || {};
    return block[key] || null;
  }

  async setItem(key, item) {
    const blockName = this.keyBlockMap[key];
    if (blockName) {
      const block = await this.getBlock(blockName);
      if (block) {
        this.keyBlockMap[key] = block.name;
        block.setItem(key, item);
        return this.setBlock(block);
      }
    }
    if (this.currentBlock.size >= AsyncStorageManager.maxBlockSize) {
      this.currentBlock = new AsyncStorageBlock();
    }
    this.keyBlockMap[key] = this.currentBlock.name;
    this.currentBlock.setItem(key, item);
    return this.setBlock(this.currentBlock);
  }
}
