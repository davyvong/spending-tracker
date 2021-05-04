import { CacheModule, Module } from '@nestjs/common';

import { CurrencyResolver } from './currency.resolver';
import { CurrencyService } from './currency.service';

@Module({
  exports: [CurrencyService],
  imports: [CacheModule.register()],
  providers: [CurrencyResolver, CurrencyService],
})
export class CurrencyModule {}
