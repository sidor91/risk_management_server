export class CreateRiskDto {
  name: string;
  description: string;
  createdBy: string;
  categoryId: string;
  resolved?: boolean;
}
