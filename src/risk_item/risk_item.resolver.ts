import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RiskItemService } from './risk_item.service';
import { Risk } from './risk_item.schema';

@Resolver()
export class RiskItemResolver {
  constructor(private readonly riskItemService: RiskItemService) {}

  @Query(() => [Risk])
  async categories() {
    return this.riskItemService.findAllRisks();
  }

  @Mutation(() => Risk)
  async createCategory(
    @Args('name') name: string,
    @Args('description') description: string,
    @Args('createdBy') createdBy: string,
    @Args('categoryId') categoryId: string,
    @Args('resolved') resolved: boolean,
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
  async deleteCategory(@Args('id') id: string) {
    return this.riskItemService.deleteCategory(id);
  }
}
