import { Bucket, File } from '@google-cloud/storage';
import { Injectable } from '@nestjs/common';
import FileType from 'file-type';
import * as admin from 'firebase-admin';
import { getTimestampFromDateString } from 'src/common/utils/date.util';

import { StorageFileModel } from './models/storage-file.model';

@Injectable()
export class FirebaseStorageService {
  private readonly bucket: Bucket;
  private readonly storage: admin.storage.Storage;

  constructor() {
    this.storage = admin.storage();
    this.bucket = this.storage.bucket(process.env.GOOGLE_STORAGE_BUCKET);
  }

  getBucket(): Bucket {
    return this.bucket;
  }

  getStorage(): admin.storage.Storage {
    return this.storage;
  }

  getFile(filePath: string): File {
    return this.getBucket().file(filePath);
  }

  async uploadFile(filePath: string, url: string): Promise<StorageFileModel> {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileType = await FileType.fromBuffer(buffer);
    if (!fileType?.ext) {
      return null;
    }
    const firebaseFile = await this.getFile(`${filePath}.${fileType.ext}`);
    return new Promise((resolve, reject) => {
      const writeStream = firebaseFile.createWriteStream({ predefinedAcl: 'publicRead', resumable: false });
      writeStream.on('error', reject);
      writeStream.on('finish', async () => {
        const [metadata] = await firebaseFile.getMetadata();
        resolve({
          contentType: metadata.contentType,
          createTime: getTimestampFromDateString(metadata.timeCreated),
          mediaLink: metadata.mediaLink,
          name: metadata.name,
          size: Number(metadata.size),
          updateTime: getTimestampFromDateString(metadata.updated),
        });
      });
      writeStream.end(buffer);
    });
  }
}
