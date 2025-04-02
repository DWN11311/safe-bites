import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartsService {
  private readonly dB_URL = 'http://localhost:3000/products';

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
}
