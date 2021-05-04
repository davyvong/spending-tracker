import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { CategoryModel } from './models/category.model';

@Injectable()
export class CategoryService {
  constructor(@InjectModel('categories') private readonly categoryModel) {}

  async getAll(): Promise<CategoryModel[]> {
    return this.categoryModel.find();
  }
}
