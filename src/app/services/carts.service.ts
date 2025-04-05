import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartsService {
  private readonly dB_URL = 'http://localhost:3000/products';
  private countSubject = new BehaviorSubject<number>(0);
  count$ = this.countSubject.asObservable();
  constructor(private http: HttpClient) {}
  //handel all request
  getAllProducts() {
    return this.http.get(this.dB_URL);
  }
  deleteProduct(productId: number) {
    return this.http.delete(`${this.dB_URL}/${productId}`);
  }
  clearCartFromBackend(cartItems: any[]) {
    return forkJoin(
      cartItems.map(item =>
        this.http.delete(`${this.dB_URL}/${item.id}`).pipe()
      )
    );
  }

  updateCount(items: any[]) {
    const total = items.reduce((sum, item) => sum + (item.quantity || 1), 0);
    this.countSubject.next(total);
  }
}
