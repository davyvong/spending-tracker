import { UseGuards } from '@nestjs/common';
import { Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

import { CategoryService } from './category.service';
import { CategoryModel } from './models/category.model';

@Resolver()
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => [CategoryModel])
  @UseGuards(JwtAuthGuard)
  async getAllCategories(): Promise<CategoryModel[]> {
    return this.categoryService.getAll();
  }
}
