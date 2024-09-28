import { Module } from '@nestjs/common';
import { RiskCategoryService } from './risk_category.service';
import { RiskCategoryResolver } from './risk_category.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, RiskCategorySchema } from './risk_category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: RiskCategorySchema },
    ]),
  ],
  providers: [RiskCategoryResolver, RiskCategoryService],
})
export class RiskCategoryModule {}
