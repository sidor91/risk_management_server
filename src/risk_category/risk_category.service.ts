import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './risk_category.schema';
import { Model } from 'mongoose';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PaginatedResponse } from 'src/@common/pagination.dto';
import { SortAndPaginationDto } from 'src/@common/sort-and-pagination.dto';
import { SortOrder } from 'src/@common/sort-order.dto';

@Injectable()
export class RiskCategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}

  async findAllWithPagination(
    dto: SortAndPaginationDto,
  ): Promise<PaginatedResponse<Category>> {
    const { page, limit, sortByDateOrder } = dto;
    const createdAt = sortByDateOrder === SortOrder.ASC ? 1 : -1;

    const [risks, total] = await Promise.all([
      this.categoryModel
        .find()
        .sort({ createdAt })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(),
      this.categoryModel.countDocuments().exec(),
    ]);

    return {
      items: risks,
      total,
    };
  }

  async findAllByIds(categoryIds: string[]): Promise<(Category | undefined)[]> {
    try {
      const categories = await this.categoryModel
        .find({ _id: { $in: categoryIds } })
        .exec();

      const categoryMap = new Map(
        categories.map((category) => [category.id, category]),
      );
      return categoryIds.map((id) => categoryMap.get(id) || undefined);
    } catch (error) {
      return categoryIds.map(() => undefined);
    }
  }

  async create(dto: CreateCategoryDto): Promise<Category> {
    const newCategory = new this.categoryModel(dto);
    return await newCategory.save();
  }

  async delete(id: string): Promise<Category> {
    const deletedCategory = await this.categoryModel
      .findByIdAndDelete(id)
      .exec();
    if (!deletedCategory)
      throw new Error(`Category with id ${id} wasn't found`);
    return deletedCategory;
  }
}
