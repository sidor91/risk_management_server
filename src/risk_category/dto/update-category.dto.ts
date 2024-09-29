export class UpdateCategoryDto {
  id: string;
  updateFields: { name?: string; description?: string };
}
