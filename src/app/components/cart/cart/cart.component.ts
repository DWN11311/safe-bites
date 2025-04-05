import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-cart',
  imports: [CommonModule, RouterModule],
  providers: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  /*
  cart: any;
  constructor(private CartsService: CartsService) {}
  ngOnInit() {
    this.CartsService.getAllProducts().subscribe({
      next: data => {
        this.cart = data;
        console.log(data);
      },
      error: err => {
        console.log(err);
      },
    });
  }
    */
}
