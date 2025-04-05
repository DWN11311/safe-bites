import { Product } from './product.model';

export type Cart = Record<
  string,
  Pick<
    Product,
    | 'name'
    | 'price'
    | 'images'
    | 'brief'
    | 'description'
    | '_id'
    | 'averageRating'
  >
>;