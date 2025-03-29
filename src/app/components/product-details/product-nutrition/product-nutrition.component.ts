import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-nutrition',
  imports: [],
  templateUrl: './product-nutrition.component.html',
  styleUrl: './product-nutrition.component.css',
})
export class ProductNutritionComponent implements OnInit{
  product: any;
  constructor (private http: HttpClient, private route: ActivatedRoute){};
  ngOnInit() {
    const productId = this.route.snapshot.paramMap.get('id');
    if(productId){
      this.http.get(`http://localhost:8282/products/${productId}`).subscribe({
        next: (response: any) => {
          this.product = response.data;
          console.log('full object', this.product);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {
          console.log("Request Completed");
        }
      })
    }
  }
}
