import {
  Args,
  Context,
  ID,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { RiskItemService } from './risk_item.service';
import { Risk } from './risk_item.schema';
import { Category } from 'src/risk_category/risk_category.schema';
import DataLoader from 'dataloader';
import { PaginatedRiskResponseSchema } from './risk_item.schema';
import { PaginatedResponse } from 'src/@common/dto/pagination.dto';
import { SortOrder } from 'src/@common/dto/sort-order.dto';

interface GraphQLContext {
  loaders: {
    categoryLoader: DataLoader<string, Category>;
  };
}

@Resolver(() => Risk)
export class RiskItemResolver {
  constructor(private readonly riskItemService: RiskItemService) {}

  @Query(() => PaginatedRiskResponseSchema)
  async getRisks(
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number,
    @Args('sortByDateOrder', {
      type: () => SortOrder,
      defaultValue: SortOrder.DESC,
    })
    sortByDateOrder: SortOrder,
  ): Promise<PaginatedResponse<Risk>> {
    return this.riskItemService.findAllWithPagination({
      page,
      limit,
      sortByDateOrder,
    });
  }

  @ResolveField(() => Category)
  async category(@Parent() risk: Risk, @Context() context: GraphQLContext) {
    return context.loaders.categoryLoader.load(risk.categoryId);
  }

  @Mutation(() => Risk)
  async createRisk(
    @Args('name') name: string,
    @Args('description') description: string,
    @Args('createdBy') createdBy: string,
    @Args('categoryId') categoryId: string,
    @Args('resolved', { nullable: true }) resolved?: boolean,
  ) {
    return this.riskItemService.createRisk({
      name,
      description,
      createdBy,
      categoryId,
      resolved,
    });
  }

  @Mutation(() => Risk)
  async updateRisk(
    @Args('id', { type: () => ID }) id: string,
    @Args('name', { nullable: true }) name?: string,
    @Args('description', { nullable: true }) description?: string,
    @Args('resolved', { nullable: true }) resolved?: boolean,
  ) {
    return this.riskItemService.update({
      id,
      updateFields: { name, description, resolved },
    });
  }

  @Mutation(() => Risk)
  async deleteRisk(@Args('id') id: string) {
    return this.riskItemService.deleteRisk(id);
  }
}
