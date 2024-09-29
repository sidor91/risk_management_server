import { UpdateCategoryDto } from "src/risk_category/dto/update-category.dto";

export class UpdateRiskDto extends UpdateCategoryDto {
  updateFields: { name?: string; description?: string; resolved?: boolean };
}