import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CategoryResolver } from './category.resolver';
import { CategoryService } from './category.service';
import { CategorySchema } from './schemas/category.schema';

@Module({
  exports: [CategoryService],
  imports: [MongooseModule.forFeature([{ name: 'categories', schema: CategorySchema }])],
  providers: [CategoryResolver, CategoryService],
})
export class CategoryModule {}
