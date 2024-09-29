import * as DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import { RiskCategoryService } from 'src/risk_category/risk_category.service';
import { Category } from 'src/risk_category/risk_category.schema';

@Injectable({ scope: Scope.REQUEST })
export class DataLoaderService {
  constructor(private readonly riskCategoryService: RiskCategoryService) {}

  public categoryLoader = new DataLoader<string, Category | undefined>(
    async (categoryIds: string[]) => {
      return await this.riskCategoryService.findAllByIds(categoryIds);
    },
  );
}
