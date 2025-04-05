import { Image, Product } from './product.model';

export type CartItem = {
  name?: string,
  price?: Number,
  images: Image[],
  brief?: string,
  description?: string,
  _id?: string,
  averageRating?: Number,
  quantity?: Number
}

export type Cart = Record<
  string, CartItem
>

/*Record<
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
    | 'quantity'
  >
>; */
