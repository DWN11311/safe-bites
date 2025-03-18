import { SubCategory } from './subCategory.model';

export interface Category {
  _id: string;
  name: string;
  type: string;
  checked?: boolean;
  isCollapsed?: boolean;
  categories: SubCategory[];
}
