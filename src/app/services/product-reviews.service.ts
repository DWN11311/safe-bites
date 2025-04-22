import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductReview } from '../models/product-review.model';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductReviewsService {
  private readonly url = 'http://localhost:8282/products';

  constructor(private http: HttpClient) {}

  getProductReviews(productId: string): Observable<any> {
    let reqUrl = `${this.url}/${productId}/reviews`;
    return this.http.get(reqUrl);
  }

  addNewReview(review: any, productId: string, token: string) {
    let reqUrl = `${this.url}/${productId}/reviews`;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    return this.http.post(reqUrl, review, { headers });
  }
}
