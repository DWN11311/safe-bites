import { Image, Product } from './product.model';

export type CartItem = {
  name?: string;
  price?: Number;
  images: Image[];
  brief?: string;
  description?: string;
  _id?: string;
  averageRating?: Number;
  quantity?: Number;
};

export type Cart = Record<string, CartItem>;
