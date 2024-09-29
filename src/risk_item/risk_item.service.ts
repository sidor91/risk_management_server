import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Risk } from './risk_item.schema';
import { Model } from 'mongoose';
import { CreateRiskDto } from './dto/create-risk.dto';
import { PaginatedResponse } from 'src/@common/pagination.dto';
import { SortAndPaginationDto } from 'src/@common/sort-and-pagination.dto';
import { SortOrder } from 'src/@common/sort-order.dto';

@Injectable()
export class RiskItemService {
  constructor(@InjectModel(Risk.name) private riskModel: Model<Risk>) {}

  async findAllWithPagination(
    dto: SortAndPaginationDto,
  ): Promise<PaginatedResponse<Risk>> {
    const { page, limit, sortByDateOrder } = dto;
    const createdAt = sortByDateOrder === SortOrder.ASC ? 1 : -1;

    const [risks, total] = await Promise.all([
      this.riskModel
        .find()
        .sort({ createdAt })
        .skip((page - 1) * limit)
        .limit(limit)
        .exec(),
      this.riskModel.countDocuments().exec(),
    ]);

    return {
      items: risks,
      total,
    };
  }

  async createRisk(dto: CreateRiskDto) {
    const newRisk = new this.riskModel(dto);
    return await newRisk.save();
  }

  async deleteRisk(id: string): Promise<Risk> {
    const deletedRisk = await this.riskModel.findByIdAndDelete(id).exec();
    if (!deletedRisk) throw new Error(`Risk with id ${id} wasn't found`);
    return deletedRisk;
  }
}
