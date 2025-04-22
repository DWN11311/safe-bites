import { ProductsService } from './../../../services/products.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-nutrition',
  imports: [],
  templateUrl: './product-nutrition.component.html',
  styleUrl: './product-nutrition.component.css',
})
export class ProductNutritionComponent implements OnInit {
  product: any;
  productNutrition: [] = [];

  constructor(
    private http: HttpClient,
    private toaster: ToastrService,
    private route: ActivatedRoute,
    private productService: ProductsService
  ) {}
  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productService.getProductById(productId).subscribe({
        next: (res: any) => {
          this.productNutrition = res.data.nutritionalValues;
          console.log(this.productNutrition);
        },
        error: err => {
          this.toaster.error('Faild to get nutrition of this product', 'Error');
        },
      });
    }
  }
}

/*
this.http.get(`http://localhost:8282/products/${productId}`).subscribe({
        next: (response: any) => {
          this.product = response.data;
          console.log('full object', this.product);
        },
        error: err => {
          console.log(err);
        },
        complete: () => {
          console.log('Request Completed');
        },
      });

*/
