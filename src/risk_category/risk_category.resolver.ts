import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RiskCategoryService } from './risk_category.service';
import { Category } from './risk_category.schema';

@Resolver()
export class RiskCategoryResolver {
  constructor(private readonly riskCategoryService: RiskCategoryService) {}

  @Query(() => [Category]) 
  async categories() {
    return this.riskCategoryService.findAllCategories();
  }

  
  @Mutation(() => Category) 
  async createCategory(
    @Args('name') name: string,
    @Args('description') description: string,
    @Args('createdBy') createdBy: string,
  ) {
    return this.riskCategoryService.createCategory(name, description, createdBy);
  }

  
  @Mutation(() => Category)
  async deleteCategory(@Args('id') id: string) {
    return this.riskCategoryService.deleteCategory(id);
  }
}
