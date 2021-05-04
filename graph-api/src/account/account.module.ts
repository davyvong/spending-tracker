import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AccountResolver } from './account.resolver';
import { AccountService } from './account.service';
import { AccountSchema } from './schemas/account.schema';

@Module({
  exports: [AccountService],
  imports: [MongooseModule.forFeature([{ name: 'accounts', schema: AccountSchema }])],
  providers: [AccountResolver, AccountService],
})
export class AccountModule {}
