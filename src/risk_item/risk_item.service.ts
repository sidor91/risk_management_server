import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Risk } from './risk_item.schema';
import { Model } from 'mongoose';
import { CreateRiskDto } from './dto/create-risk.dto';

@Injectable()
export class RiskItemService {
  constructor(@InjectModel(Risk.name) private riskModel: Model<Risk>) {}

  async findAllRisks(): Promise<Risk[]> {
    return await this.riskModel.find().exec();
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
