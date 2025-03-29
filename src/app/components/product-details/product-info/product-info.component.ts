import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../models/product.model';
@Component({
  selector: 'app-product-info',
  imports: [CommonModule],
  templateUrl: './product-info.component.html',
  styleUrl: './product-info.component.css',
})
export class ProductInfoComponent implements OnChanges {
  @Input() product?: Product;

  quantity: number = 1;
  yellowStars: Array<number> = [];
  whiteStars: Array<number> = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['availableQuantity'] && this.product?.quantity !== undefined) {
      if (this.quantity > this.product?.quantity) {
        this.quantity = this.product?.quantity;
      }
    }
    if (this.product) {
      this.product.rank = 3;
      this.yellowStars = new Array(this.product.rank);
      this.whiteStars = new Array(5 - this.product.rank);
    }

  }

  increaseQuantity() {
    if (this.product?.quantity !== undefined && this.quantity < this.product?.quantity)
      this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1)
      this.quantity--;
  }

  addToCart(){}
  addToWishlist(){}
}
