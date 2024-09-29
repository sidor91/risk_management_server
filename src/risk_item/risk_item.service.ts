import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Risk } from './risk_item.schema';
import { Model } from 'mongoose';
import { CreateRiskDto } from './dto/create-risk.dto';
import { PaginatedResponse } from 'src/@common/dto/pagination.dto';
import { SortAndPaginationDto } from 'src/@common/dto/sort-and-pagination.dto';
import { SortOrder } from 'src/@common/dto/sort-order.dto';
import { UpdateRiskDto } from './dto/update-risk.dto';

@Injectable()
export class RiskItemService {
  constructor(@InjectModel(Risk.name) private riskModel: Model<Risk>) {}

  async findById(id: string) {
    return this.riskModel.findById(id);
  }

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

  async update(dto: UpdateRiskDto): Promise<Risk> {
    const {
      id,
      updateFields: { name, description, resolved },
    } = dto;
    const trimmedName = name?.trim();
    const trimmedDescription = description?.trim();
    const notFoundMessage = `Risk with id ${id} not found`;

    if (!trimmedName && !trimmedDescription) {
      const risk = await this.findById(id);
      if (!risk) throw new Error(notFoundMessage);
      return risk;
    }

    const itemsToUpdate: Partial<Risk> = {};
    if (trimmedName) itemsToUpdate.name = trimmedName;
    if (trimmedDescription) itemsToUpdate.description = trimmedDescription;
    if (resolved) itemsToUpdate.resolved = resolved;

    const updatedRisk = await this.riskModel
      .findByIdAndUpdate(id, { $set: itemsToUpdate }, { new: true })
      .exec();

    if (!updatedRisk) {
      throw new Error(notFoundMessage);
    }

    return updatedRisk;
  }

  async deleteRisk(id: string): Promise<Risk> {
    const deletedRisk = await this.riskModel.findByIdAndDelete(id).exec();
    if (!deletedRisk) throw new Error(`Risk with id ${id} wasn't found`);
    return deletedRisk;
  }
}
