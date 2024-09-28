import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './risk_category.schema';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class RiskCategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async findAllCategories(): Promise<Category[]> {
    return await this.categoryModel.find().exec();
  }

  async createCategory(dto: CreateCategoryDto): Promise<Category> {
    const newCategory = new this.categoryModel(dto);
    return await newCategory.save();
  }

  async deleteCategory(id: string): Promise<Category> {
    const deletedCategory = await this.categoryModel
      .findByIdAndDelete(id)
      .exec();
    if (!deletedCategory)
      throw new Error(`Category with id ${id} wasn't found`);
    return deletedCategory;
  }
}
