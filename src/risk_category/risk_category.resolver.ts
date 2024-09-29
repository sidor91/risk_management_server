import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RiskCategoryService } from './risk_category.service';
import { Category } from './risk_category.schema';

@Resolver()
export class RiskCategoryResolver {
  constructor(private readonly riskCategoryService: RiskCategoryService) {}

  @Query(() => [Category])
  async getCategories() {
    return this.riskCategoryService.findAll();
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
