import { Module } from '@nestjs/common';
import { CurrencyModule } from 'src/currency/currency.module';
import { TransactionModule } from 'src/transaction/transaction.module';

import { SummaryResolver } from './summary.resolver';
import { SummaryService } from './summary.service';

@Module({
  exports: [SummaryService],
  imports: [CurrencyModule, TransactionModule],
  providers: [SummaryResolver, SummaryService],
})
export class SummaryModule {}
