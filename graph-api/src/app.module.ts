import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import GraphQLJSON from 'graphql-type-json';

import { AccountModule } from './account/account.module';
import { AuthModule } from './auth/auth.module';
import { CardModule } from './card/card.module';
import { CategoryModule } from './category/category.module';
import { formatError } from './common/graphql/format-error';
import { CurrencyModule } from './currency/currency.module';
import { FirebaseModule } from './firebase/firebase.module';
import { SummaryModule } from './summary/summary.module';
import { TransactionModule } from './transaction/transaction.module';
import { VendorModule } from './vendor/vendor.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: process.cwd() + '/src/schema.gql',
      formatError,
      installSubscriptionHandlers: false,
      introspection: process.env.NODE_ENV === 'development',
      playground: process.env.NODE_ENV === 'development',
      resolvers: { JSON: GraphQLJSON },
      useGlobalPrefix: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
    FirebaseModule.forRoot(),
    AuthModule,
    AccountModule,
    CardModule,
    CategoryModule,
    CurrencyModule,
    SummaryModule,
    TransactionModule,
    VendorModule,
  ],
})
export class AppModule {}
