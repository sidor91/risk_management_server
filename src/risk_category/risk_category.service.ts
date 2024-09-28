import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './risk_category.schema';
import { Model } from 'mongoose';

@Injectable()
export class RiskCategoryService {
  constructor(@InjectModel(Category.name) private categoryModel: Model<Category>) {}

  async findAllCategories(): Promise<Category[]> {
    return await this.categoryModel.find().exec();
  }

  async createCategory(
    name: string,
    description: string,
    createdBy: string,
  ): Promise<Category> {
    const newCategory = new this.categoryModel({
      name,
      description,
      createdBy,
    });
    return await newCategory.save();
  }

  async deleteCategory(id: string): Promise<Category> {
    return await this.categoryModel.findByIdAndDelete(id).exec();
  }
}
