import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HoverDirective } from '../../directives/hover.directive';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-wishlistcard',
  imports: [HoverDirective],
  templateUrl: './wishlistcard.component.html',
  styleUrl: './wishlistcard.component.css'
})
export class WishlistcardComponent {

  @Input() product!: Product;
  @Output() AddToCard = new EventEmitter<Product>();
  @Output() RemoveFromWishlist = new EventEmitter<Product>();

  addToCart() {
    this.AddToCard.emit(this.product);
  }

  removeItem() {
    this.RemoveFromWishlist.emit(this.product);
  }
}

