export interface Product {
  _id: number;
  name: string;
  images: Array<Image>;
  description: string;
  price: number;
  brief: string;
  quantity: number;
  averageRating: number;
  reviews?: string[];
  categories: Cateogry[];
}

interface Cateogry {
  _id: string;
  name: string;
}

export interface Image {
  _id: string;
  imageUrl: string;
}
