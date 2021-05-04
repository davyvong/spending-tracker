import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionModule } from 'src/transaction/transaction.module';

import { CardResolver } from './card.resolver';
import { CardService } from './card.service';
import { CardSchema } from './schemas/card.schema';

@Module({
  exports: [CardService],
  imports: [MongooseModule.forFeature([{ name: 'cards', schema: CardSchema }]), TransactionModule],
  providers: [CardResolver, CardService],
})
export class CardModule {}
