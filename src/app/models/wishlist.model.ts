import { Product } from './product.model';

export type Wishlist = Record<
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
