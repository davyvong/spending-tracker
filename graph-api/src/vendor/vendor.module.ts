import { CacheModule, Module } from '@nestjs/common';

import { VendorResolver } from './vendor.resolver';
import { VendorService } from './vendor.service';

@Module({
  exports: [VendorService],
  imports: [CacheModule.register()],
  providers: [VendorResolver, VendorService],
})
export class VendorModule {}
