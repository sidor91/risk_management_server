import { Module } from '@nestjs/common';
import { DataLoaderService } from './data-loader.service';
import { RiskCategoryModule } from 'src/risk_category/risk_category.module';

@Module({
  imports: [RiskCategoryModule],
  providers: [DataLoaderService],
  exports: [DataLoaderService],
})
export class DataLoaderModule {}
