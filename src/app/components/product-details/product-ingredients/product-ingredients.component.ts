import { ToastrService } from 'ngx-toastr';
import { ProductsService } from './../../../services/products.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-ingredients',
  imports: [],
  templateUrl: './product-ingredients.component.html',
  styleUrl: './product-ingredients.component.css',
})
export class ProductIngredientsComponent implements OnInit {
  product: any;
  productIngredients: [] = [];

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
        next: (res: any)=>{
          this.productIngredients = res.data.ingredients;
        },
        error: (err) =>{
          this.toaster.error("Faild to get ingredients of this product","Error")
        }
      })
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
          console.log('Request completed.');
        },
      });

*/
