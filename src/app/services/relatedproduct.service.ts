import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RelatedproductService {
  private readonly url = 'http://localhost:8282/products';
  constructor(private http: HttpClient) {}
  getAllProducts() {
    return this.http.get(this.url);
  }
  getProductById(id: number) {
    return this.http.get(this.url + '/' + id);
  }
}
