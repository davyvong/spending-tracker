import { DynamicModule, Module } from '@nestjs/common';
import * as admin from 'firebase-admin';

import { FirebaseStorageService } from './firebase-storage.service';

@Module({})
export class FirebaseModule {
  static forRoot(): DynamicModule {
    admin.initializeApp();
    const providers = [FirebaseStorageService];
    return {
      global: true,
      module: FirebaseModule,
      providers,
      exports: providers,
    };
  }
}
