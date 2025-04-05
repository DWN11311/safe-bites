import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { Wishlist } from '../models/wishlist.model';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private readonly url = 'http://localhost:8282/wishlist';

  // We make a behavior subject which can emit values to subscribers and can also be passed a new value itself
  // read more about it https://www.learnrxjs.io/learn-rxjs/subjects/behaviorsubject
  // We initially have it be empty until we fetch the wishlist from the backend
  // NOTICE: the subject is private while the observable is not
  private wishlistSubject = new BehaviorSubject<Wishlist>({});
  // we make an observable out of the behvaiour subject because we don't want anyone to pass a value to our behaviour subject outside of the service
  // this is what we will subscribe to outside the service, we do this because we want the service to be the only place where the value of the behavior subject can be changed
  public wishlist$ = this.wishlistSubject.asObservable();

  formatWishlist(response: { data: { productId: Product }[] }) {
    if (response.data) {
      const transformedData = response.data.reduce((acc, currProduct) => {
        const product = currProduct.productId;
        acc[product._id] = {
          _id: product._id,
          name: product.name,
          price: product.price,
          images: product.images,
          description: product.description,
          brief: product.brief,
          averageRating: product.averageRating,
        };
        return acc;
      }, {} as Wishlist);
      return transformedData;
    }
    return {};
  }

  getWishlist(token: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    this.http
      .get<{ data: { productId: Product }[] }>(this.url, { headers })
      .pipe(map(data => this.formatWishlist(data)))
      .subscribe({
        next: formattedData => {
          this.wishlistSubject.next(formattedData);
        },
      });
  }

  addToWishlist(productId: string, token: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    this.http
      .post<{
        data: { productId: Product }[];
      }>(`${this.url}/${productId}`, {}, { headers })
      .pipe(map(data => this.formatWishlist(data)))
      .subscribe({
        next: formattedData => {
          this.wishlistSubject.next(formattedData);
        },
      });
  }

  removeFromWishlist(productId: string, token: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    this.http
      .delete<{
        data: { productId: Product }[];
      }>(`${this.url}/${productId}`, { headers })
      .pipe(map(data => this.formatWishlist(data)))
      .subscribe({
        next: formattedData => {
          this.wishlistSubject.next(formattedData);
        },
      });
  }

  clearWishList(token: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    this.http
      .delete<{ data: { productId: Product }[] }>(this.url, { headers })
      .subscribe({
        next: response => {
          this.wishlistSubject.next({});
        },
      });
  }

  constructor(private http: HttpClient) {}
}
