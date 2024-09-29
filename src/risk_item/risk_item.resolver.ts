import {
  Args,
  Context,
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

interface GraphQLContext {
  loaders: {
    categoryLoader: DataLoader<string, Category>;
  };
}

@Resolver(() => Risk)
export class RiskItemResolver {
  constructor(private readonly riskItemService: RiskItemService) {}

  @Query(() => [Risk])
  async getRisks() {
    return this.riskItemService.findAllRisks();
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
  async deleteRisk(@Args('id') id: string) {
    return this.riskItemService.deleteRisk(id);
  }
}
