import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RiskCategoryService } from './risk_category.service';
import {
  Category,
  PaginatedCategoryResponseSchema,
} from './risk_category.schema';
import { PaginatedResponse } from 'src/@common/pagination.dto';
import { SortOrder } from 'src/@common/sort-order.dto';

@Resolver()
export class RiskCategoryResolver {
  constructor(private readonly riskCategoryService: RiskCategoryService) {}

  @Query(() => PaginatedCategoryResponseSchema)
  async getCategories(
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number,
    @Args('sortByDateOrder', {
      type: () => SortOrder,
      defaultValue: SortOrder.DESC,
    })
    sortByDateOrder: SortOrder,
  ): Promise<PaginatedResponse<Category>> {
    return this.riskCategoryService.findAllWithPagination({
      page,
      limit,
      sortByDateOrder,
    });
  }

  @Mutation(() => Category)
  async create(
    @Args('name') name: string,
    @Args('description') description: string,
    @Args('createdBy') createdBy: string,
  ) {
    return this.riskCategoryService.create({
      name,
      description,
      createdBy,
    });
  }

  @Mutation(() => Category)
  async delete(@Args('id') id: string) {
    return this.riskCategoryService.delete(id);
  }
}
