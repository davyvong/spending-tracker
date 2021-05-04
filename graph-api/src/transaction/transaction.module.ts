import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VendorModule } from 'src/vendor/vendor.module';

import { TransactionResolver } from './transaction.resolver';
import { TransactionService } from './transaction.service';
import { TransactionSchema } from './schemas/transaction.schema';

@Module({
  exports: [TransactionService],
  imports: [MongooseModule.forFeature([{ name: 'transactions', schema: TransactionSchema }]), VendorModule],
  providers: [TransactionResolver, TransactionService],
})
export class TransactionModule {}
