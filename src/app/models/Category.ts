import { SubCategory } from './SubCategory';

export interface Category {
  _id: string;
  name: string;
  type: string;
  checked?: boolean;
  isCollapsed?: boolean;
  categories: SubCategory[];
}
