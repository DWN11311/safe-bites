import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly url = 'http://localhost:3000/products';
  constructor(private http: HttpClient) {}
  getAllProducts() {
    return this.http.get(this.url);
  }
  getProductById(id: number) {
    return this.http.get(this.url + '/' + id);
  }
  // createProduct(porduct:Product){
  //   return this.http.post(this.url, porduct);
  // }
}
