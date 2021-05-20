import RNAsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorageBlock from 'storage/async-storage-block';

export default class AsyncStorageManager {
  static maxBlockSize = 100;
  static namespace = 'async-storage-manager';

  constructor() {
    this.bufferSize = 0;
    this.currentBlock = new AsyncStorageBlock();
    this.keyBlockMap = {};
    this.writeBuffer = {};
  }

  async rehydrate() {
    let stateData = await RNAsyncStorage.getItem(AsyncStorageManager.namespace);
    if (stateData) {
      stateData = JSON.parse(stateData);
      Object.assign(this, stateData);
      this.currentBlock = await this.getBlock(stateData.currentBlock);
    }
  }

  async persist() {
    return RNAsyncStorage.setItem(
      AsyncStorageManager.namespace,
      JSON.stringify({
        bufferSize: this.bufferSize,
        currentBlock: this.currentBlock.name,
        keyBlockMap: this.keyBlockMap,
        writeBuffer: this.writeBuffer,
      }),
    );
  }

  flush() {
    if (this.bufferSize > 0) {
      const buffer = this.writeBuffer;
      this.writeBuffer = {};
      this.bufferSize = 0;
      for (const blockName in buffer) {
        const block = buffer[blockName];
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
      this.bufferSize++;
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
