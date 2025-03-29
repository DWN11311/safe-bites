export interface ProductReview {
  userId: {
    firstName: string;
    lastName: string;
    image: {
      imageUrl: string;
    };
  };
  rating: 1 | 2 | 3 | 4 | 5;
  reviewTitle: string;
  reviewDescription: string;
  _id: string;
}
