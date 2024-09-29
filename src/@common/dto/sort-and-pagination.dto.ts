import { SortOrder } from './sort-order.dto';

export class SortAndPaginationDto {
  page: number;
  limit: number;
  sortByDateOrder: SortOrder;
}
