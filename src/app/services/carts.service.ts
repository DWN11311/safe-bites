import { Injectable, Pipe } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Cart } from '../models/cart.model';
import { Product } from '../models/product.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartsService {

  private readonly url = 'http://localhost:8282/carts';
  private cartSubject = new BehaviorSubject<Cart>({});
  public cart$ = this.cartSubject.asObservable();

  formatCart(response: {data: {productId: Product}[]}){
    if(response.data){
      const transformedData = response.data.reduce((acc, currentProduct) => {
        const product = currentProduct.productId;
        acc[product._id] = {
          _id: product._id,
          name: product.name,
          price: product.price,
          images: product.images,
          description: product.description,
          brief: product.brief,
          averageRating: product.averageRating
        };
        return acc;
      }, {} as Cart);
      return transformedData;
    }
    return {};
  }

  getCart(token: string){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    this.http.get<{ data: {productId: Product}[] }>(this.url, {headers})
    .pipe(map(data => this.formatCart(data)))
    .subscribe({
      next: formattedData => {
        this.cartSubject.next(formattedData);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


  addToCart(productId: string, token: string){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    this.http.post<{ data: {productId: Product}[] }>(`${this.url}/${productId}`, {}, { headers })
    .pipe(map(data => this.formatCart(data)))
    .subscribe({
      next: formattedData => {
        this.cartSubject.next(formattedData);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  updateCart(productId: string, quantity: Number ,token: string){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    this.http.put<{ data: {productId: Product}[] }>(`${this.url}/${productId}`, { quantity } ,{ headers })
    .pipe(map(data => this.formatCart(data)))
    .subscribe({
      next: formattedData => {
        this.cartSubject.next(formattedData);
      },
      error: err => {
        console.log(err);
      }
    })
  }

  removeFromCart(productId: string, token: string){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    this.http.delete<{ data: {productId: Product}[] }>(`${this.url}/${productId}`, { headers })
    .pipe(map(data => this.formatCart(data)))
    .subscribe({
      next: fotmattedData => {
        this.cartSubject.next(fotmattedData);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  clearCart(token: string){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    this.http.delete<{ data: {productId: Product}[] }>(`${this.url}`, { headers })
    .subscribe({
      next: response => {
        this.cartSubject.next({});
      },
      error: err => {
        console.log(err);
      }
    })
  }

  constructor(private http: HttpClient) { }
}
