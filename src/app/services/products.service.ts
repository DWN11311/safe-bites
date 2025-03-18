import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly url = 'http://localhost:8282/products';
  constructor(private http: HttpClient) {}

  getAllProducts(queryString?: string) {
    let reqUrl = this.url;
    if (queryString) reqUrl += `?${queryString}`;

    return this.http.get(reqUrl);
  }

  getProductById(id: number) {
    return this.http.get(this.url + '/' + id);
  }
  // createProduct(porduct:Product){
  //   return this.http.post(this.url, porduct);
  // }
}
