import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ParamMap } from '@angular/router';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly url = 'http://localhost:8282/products';
  constructor(private http: HttpClient) {}

  getAllProducts(queryParams: ParamMap, page: number, limit: number) {
    let httpParams = new HttpParams().set('page', page).set('limit', limit);

    queryParams.keys.forEach(key => {
      const values = queryParams.getAll(key);
      values.forEach(value => {
        httpParams = httpParams.append(key, value);
      });
    });

    return this.http.get(this.url, { params: httpParams });
  }

  getProductById(id: string) {
    return this.http.get(this.url + '/' + id);
  }

  updateProductQuantity(
    productId: string,
    quantityChange: number,
    operation: 'increase' | 'decrease',
    token: string
  ) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    const body = { quantityChange, operation };
    return this.http.put(
      `${this.url}/${productId}`, // استخدام نفس الـ endpoint بتاع updateProduct
      body,
      { headers }
    );
  }
  // createProduct(porduct:Product){
  //   return this.http.post(this.url, porduct);
  // }
}
