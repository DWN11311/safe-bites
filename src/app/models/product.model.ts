export interface Product {
  id: number;
  name: string;
  images: Array<Image>;
  description: string;
  price: number;
  brief: string;
  rank: number;
}

export interface Image {
  _id: string,
  imageUrl: string
}