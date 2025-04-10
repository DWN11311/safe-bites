import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../models/product.model';
import { CartsService } from '../../../services/carts.service';
import { WishlistService } from '../../../services/wishlist.service';
import { Wishlist } from '../../../models/wishlist.model';
import { Cart } from '../../../models/cart.model';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-product-info',
  imports: [CommonModule],
  templateUrl: './product-info.component.html',
  styleUrl: './product-info.component.css',
})
export class ProductInfoComponent implements OnChanges {
  @Input() product?: Product;
  wishlist: Wishlist = {};
  cart: Cart = {};
  token = localStorage.getItem('token');

  quantity: number = 1;
  // yellowStars: Array<number> = [];
  // whiteStars: Array<number> = [];

  constructor(
    private cartService: CartsService,
    private wishlistService: WishlistService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.cartService.cart$.subscribe(data => {
      this.cart = data;
    });

    this.wishlistService.wishlist$.subscribe(data => {
      this.wishlist = data;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['availableQuantity'] && this.product?.quantity !== undefined) {
      if (this.quantity > this.product?.quantity) {
        this.quantity = this.product?.quantity;
      }
    }
    // if (this.product) {
    //   this.product.averageRating = 3;
    //   this.yellowStars = new Array(this.product.averageRating);
    //   this.whiteStars = new Array(5 - this.product.averageRating);
    // }
  }

  increaseQuantity() {
    if (
      this.product?.quantity !== undefined &&
      this.quantity < this.product?.quantity
    )
      this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) this.quantity--;
  }

  addToCart() {
    if (this.token && this.product) {
      this.cartService.addToCart(this.product?._id, this.token);
    }
  }

  addToWishlist() {
    if (this.token && this.product) {
      this.wishlistService.addToWishlist(this.product?._id, this.token);
    }
  }

  removeFromWishlist() {
    if (this.token && this.product) {
      this.wishlistService.removeFromWishlist(this.product._id, this.token);
    }
  }
}
